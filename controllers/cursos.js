var logger = require('../services/logger.js');

module.exports = function(app){
  app.get('/cursos', function(req, res){
    console.log('Recebida requisicao de teste na porta 3000.')
    res.send('OK.');
  });
/* Consultado cursos por id */
  app.get('/cursos/curso/:id', function(req, res){
    var id = req.params.id;
    console.log('consultando curso: ' + id);

    logger.info('consultando curso: ' + id);

    var memcachedClient = app.services.memcachedClient();

    memcachedClient.get('curso-' + id, function(erro, retorno){
      if (erro || !retorno){
        console.log('MISS - chave nao encontrada');

        //Criando a conexão com BD
        var connection = app.models.connectionFactory();
        var CursosDao = new app.models.CursosDao(connection);

        //Buscando o curso por ID
        CursosDao.buscaPorId(id, function(erro, resultado){
          if(erro){
            console.log('Erro ao consultar no banco: ' + erro);
            res.status(500).send(erro);
            return;
          }
          console.log('Curso encontrado: ' + JSON.stringify(resultado));
          res.json(resultado);
          return;
        });
        //HIT no cache
      } else {
        console.log('HIT - valor: ' + JSON.stringify(retorno));
        res.json(retorno);
        return;
      }
    });

  });


  /* Consulta de cursos por parametro json */
  app.get('/cursos/curso', function(req, res){
    console.log('bati na rota');
    var curso = req.body["curso"];

    //Logando o recebmento do json
    console.log('Parametro utilizado na consulta de curso: ' + curso);
    logger.info('Parametro utilizado na consulta de curso: ' + curso);

    //Criando a conexão com BD
    var connection = app.models.connectionFactory();
    var CursosDao = new app.models.CursosDao(connection);

    if (curso.nome_curso!=='') {
      console.log('Comportamento curso nome');
      //Buscando o curso por nome
      CursosDao.buscaPorNome(curso.nome_curso, function(erro, resultado){
        if(erro){
          console.log('Erro ao consultar no banco: ' + erro);
          res.status(500).send(erro);
          return;
        }
        console.log('Curso encontrado: ' + JSON.stringify(resultado));
        res.json(resultado);
        return;
      });

    } else if (curso.desc_curso !=='') {
      console.log('Comportamento curso desc: ' + curso.desc_curso);
      //Buscando o curso por descrição
      CursosDao.buscaPorDescricao(curso.desc_curso, function(erro, resultado){
        if(erro){
          console.log('Erro ao consultar no banco: ' + erro);
          res.status(500).send(erro);
          return;
        }
        console.log('Curso encontrado: ' + JSON.stringify(resultado));
        res.json(resultado);
        return;
      });

    } else {

      //Lista todos os cursos da base *PERIGOSO PA PORRA*
      CursosDao.lista(function(erro, resultado){
        if(erro){
          console.log('Erro ao consultar no banco: ' + erro);
          res.status(500).send(erro);
          return;
        }
        console.log('Curso encontrado: ' + JSON.stringify(resultado));
        res.json(resultado);
        return;
      });      

    }

    });


//Método responsável por deletar o curso na base de dados
  app.delete('/cursos/curso/:id', function(req, res){
    var curso = {};
    var id = req.params.id;

    curso.cod_curso = id;

     //Criando a conexão com BD
    var connection = app.models.connectionFactory();
    var CursosDao = new app.models.CursosDao(connection);

    CursosDao.deleta(curso, function(erro){
        if (erro){
          res.status(500).send(erro);
          return;
        }
        console.log('Curso deletado');
        res.status(204).send(curso);
    });
  });

//Método responsável por atualizar as informações do curso
  app.put('/cursos/curso', function(req, res){

    //Validando os campos obrigatórios ao fazer a atualização do curso
    req.assert("curso.nome_curso","Nome do curso é obrigatório").notEmpty();
    req.assert("curso.desc_curso","Descrição do curso é obrigatório").notEmpty();
    req.assert("curso.valor_curso","Valor do curso é obrigatório e deve ser um número").notEmpty().isFloat();

    var curso = req.body["curso"];

    //Criando a conexão com BD
    var connection = app.models.connectionFactory();
    var CursosDao = new app.models.CursosDao(connection);

    //Executando update no banco e passando a variável curso como parâmetro
    CursosDao.atualiza(curso, function(erro){
        if (erro){
          console.log('Erro ao atualizar curso no banco:' + erro);
          res.status(500).send(erro);
          return;
        }
        console.log('Curso atualizado');
        res.send(curso);
    });

  });

  //Método responsável por registrar um curso no sistema
  app.post('/cursos/curso', function(req, res){

    //Quando uma chave de valor esta dentro de uma árvore, primeiro é colocado o nomedaarvore.chavedevalor
    // {"curso":{
    //    "nome_curso":"Teste",
    //    "desc_curso":"Teste de criação de curso",
    //    "valor_curso":"00.00"
    // }}
    req.assert("curso.nome_curso","Nome do curso é obrigatório").notEmpty();
    req.assert("curso.desc_curso","Descrição do curso é obrigatório").notEmpty();
    req.assert("curso.valor_curso","Valor do curso é obrigatório e deve ser um número").notEmpty().isFloat();

    var erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontrados');
      res.status(400).send(erros);
      return;
    }

    //o req.body recebe o nome da árvore de curso.
    var curso = req.body["curso"];
    console.log('Registrando um novo curso na base de dados');

    //Criando a conexão com BD
    var connection = app.models.connectionFactory();
    var CursosDao = new app.models.CursosDao(connection);

    //Fazendo o insert do json recebido no banco de dados
    CursosDao.salva(curso, function(erro, resultado){
      if(erro){
        console.log('Erro ao inserir curso no banco:' + erro);
        res.status(500).send(erro);
      } else {
      curso.cod_curso = resultado.insertId;
      console.log('Curso criado');

      //Criando uma chave de referência do curso pelo ID
      var memcachedClient = app.services.memcachedClient();
      memcachedClient.set('curso-' + curso.cod_curso, curso,
                60000, function(erro){
                  console.log('nova chave adicionada ao cache: curso-' + curso.cod_curso);
      });
        /* Hypermedia As The Engine Of Application State
        Possíves requisições após a criação de um usuario na aplicação
          *GET - Consulta
          *DELETE - Deletar
          *PUT - Atualizar
          *Post - Cadastrar
        */
        var response = {
        dados_do_curso: curso,
          links: [
            {
              href:"http://localhost:3000/cursos/curso/",
              rel:"Atualizar as informações do curso",
              method:"PUT"
            },
            {
              href:"http://localhost:3000/cursos/curso/" + curso.cod_curso,
              rel:"Deletar o curso",
              method:"DELETE"
            }
          ]
        }

       res.status(201).json(response);     
      }
    });
  });
}