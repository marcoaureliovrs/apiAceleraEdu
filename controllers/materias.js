var logger = require('../services/logger.js');

module.exports = function(app){
  app.get('/materias', function(req, res){
    console.log('Recebida requisicao de teste na porta 3000.')
    res.send('OK.');
  });

  app.get('/materias/materia/:id', function(req, res){
    var id = req.params.id;
    console.log('consultando materia: ' + id);

    logger.info('consultando materia: ' + id);

    var memcachedClient = app.services.memcachedClient();

    memcachedClient.get('materia-' + id, function(erro, retorno){
      if (erro || !retorno){
        console.log('MISS - chave nao encontrada');

        //Criando a conexão com BD
        var connection = app.models.connectionFactory();
        var MateriasDao = new app.models.MateriasDao(connection);

        //Buscando o materia por ID
        MateriasDao.buscaPorId(id, function(erro, resultado){
          if(erro){
            console.log('Erro ao consultar no banco: ' + erro);
            res.status(500).send(erro);
            return;
          }
          console.log('Materia encontrado: ' + JSON.stringify(resultado));
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

//Método responsável por deletar o materia na base de dados
  app.delete('/materias/materia/:id', function(req, res){
    var materia = {};
    var id = req.params.id;

    materia.cod_materia = id;

     //Criando a conexão com BD
    var connection = app.models.connectionFactory();
    var MateriasDao = new app.models.MateriasDao(connection);

    MateriasDao.deleta(materia, function(erro){
        if (erro){
          res.status(500).send(erro);
          return;
        }
        console.log('Materia deletada');
        res.status(204).send(materia);
    });
  });

//Método responsável por atualizar as informações do materia
  app.put('/materias/materia', function(req, res){

    //Realizando a validação dos campos obrigatórios ao fazar uma atualização da matéria
    req.assert("materia.nome_materia","Nome do materia é obrigatório").notEmpty();
    req.assert("materia.desc_materia","Descrição do materia é obrigatório").notEmpty();

    var materia = req.body["materia"];

    //Criando a conexão com BD
    var connection = app.models.connectionFactory();
    var MateriasDao = new app.models.MateriasDao(connection);

    //Executando update no banco e passando a variável materia como parâmetro
    MateriasDao.atualiza(materia, function(erro){
        if (erro){
          console.log('Erro ao atualizar materia no banco:' + erro);
          res.status(500).send(erro);
          return;
        }
        console.log('Materia atualizado');
        res.send(materia);
    });

  });

  //Método responsável por registrar um materia no sistema
  app.post('/materias/materia', function(req, res){

    //Quando uma chave de valor esta dentro de uma árvore, primeiro é colocado o nomedaarvore.chavedevalor
    // {"materia":{
    //    "nome_materia":"Materia de Teste",
    //    "cod_curso_relacionado":1,
    //    "desc_materia":"Teste de criação de materia"
    // }}
    req.assert("materia.nome_materia","Nome do materia é obrigatório").notEmpty();
    req.assert("materia.desc_materia","Descrição do materia é obrigatório").notEmpty();
    //req.assert("materia.valor_materia","Valor do materia é obrigatório e deve ser um número").notEmpty().isFloat();

    var erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontrados');
      res.status(400).send(erros);
      return;
    }

    //o req.body recebe o nome da árvore de materia.
    var materia = req.body["materia"];
    console.log('Registrando um novo materia na base de dados');

    //Criando a conexão com BD
    var connection = app.models.connectionFactory();
    var MateriasDao = new app.models.MateriasDao(connection);

    //Fazendo o insert do json recebido no banco de dados
    MateriasDao.salva(materia, function(erro, resultado){
      if(erro){
        console.log('Erro ao inserir materia no banco:' + erro);
        res.status(500).send(erro);
      } else {
      materia.cod_materia = resultado.insertId;
      console.log('Materia criado');

      //Criando uma chave de referência do materia pelo ID
      var memcachedClient = app.services.memcachedClient();
      memcachedClient.set('materia-' + materia.cod_materia, materia,
                60000, function(erro){
                  console.log('nova chave adicionada ao cache: materia-' + materia.cod_materia);
      });
        /* Hypermedia As The Engine Of Application State
        Possíves requisições após a criação de um usuario na aplicação
          *GET - Consulta
          *DELETE - Deletar
          *PUT - Atualizar
          *Post - Cadastrar
        */
        var response = {
        dados_do_materia: materia,
          links: [
            {
              href:"http://localhost:3000/materias/materia/",
              rel:"Atualizar as informações do materia",
              method:"PUT"
            },
            {
              href:"http://localhost:3000/materias/materia/" + materia.cod_materia,
              rel:"Deletar o materia",
              method:"DELETE"
            }
          ]
        }

       res.status(201).json(response);     
      }
    });
  });
}