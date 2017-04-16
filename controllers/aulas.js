var logger = require('../services/logger.js');

module.exports = function(app){
  app.get('/aulas', function(req, res){
    console.log('Recebida requisicao de teste na porta 3000.')
    res.send('OK.');
  });
/* Consultando aulas por id */
  app.get('/aulas/aula/:id', function(req, res){
    var id = req.params.id;
    console.log('consultando aula: ' + id);

    logger.info('consultando aula: ' + id);

    var memcachedClient = app.services.memcachedClient();

    memcachedClient.get('aula-' + id, function(erro, retorno){
      if (erro || !retorno){
        console.log('MISS - chave nao encontrada');

        //Criando a conexão com BD
        var connection = app.models.connectionFactory();
        var AulasDao = new app.models.AulasDao(connection);

        //Buscando o aula por ID
        AulasDao.buscaPorId(id, function(erro, resultado){
          if(erro){
            console.log('Erro ao consultar no banco: ' + erro);
            res.status(500).send(erro);
            return;
          }
          console.log('Aula encontrado: ' + JSON.stringify(resultado));
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

//Método responsável por deletar o aula na base de dados
  app.delete('/aulas/aula/:id', function(req, res){
    var aula = {};
    var id = req.params.id;

    aula.cod_aula = id;

     //Criando a conexão com BD
    var connection = app.models.connectionFactory();
    var AulasDao = new app.models.AulasDao(connection);

    AulasDao.deleta(aula, function(erro){
        if (erro){
          res.status(500).send(erro);
          return;
        }
        console.log('Aula deletado');
        res.status(204).send(aula);
    });
  });

//Método responsável por atualizar as informações da aula
  app.put('/aulas/aula', function(req, res){

    //Validando os campos obrigatórios ao fazer a atualização da aula
    req.assert("aula.nome_aula","Nome do aula é obrigatório").notEmpty();
    req.assert("aula.desc_aula","Descrição do aula é obrigatório").notEmpty();
    req.assert("aula.url_video_aula","Favor realizar o upload do vídeo antes de cadastra-lo").notEmpty();
    req.assert("aula.url_doc_aula","Favor realizar o upload da apostila antes de cadastra-la").notEmpty();
    req.assert("aula.url_ppt_aula","Favor realizar o upload da apresentação antes de cadastra-la").notEmpty();
    req.assert("aula.url_exerc_aula","Favor realizar o upload dos exercicios antes de cadastra-los").notEmpty();
    req.assert("aula.url_thumbnail","Favor realizar o upload do thumbnail antes de cadastra-lo").notEmpty();

    var aula = req.body["aula"];

    //Criando a conexão com BD
    var connection = app.models.connectionFactory();
    var AulasDao = new app.models.AulasDao(connection);

    //Executando update no banco e passando a variável aula como parâmetro
    AulasDao.atualiza(aula, function(erro){
        if (erro){
          console.log('Erro ao atualizar aula no banco:' + erro);
          res.status(500).send(erro);
          return;
        }
        console.log('Aula atualizado');
        res.send(aula);
    });

  });

  //Método responsável por registrar um aula no sistema
  app.post('/aulas/aula', function(req, res){

    /* Quando uma chave de valor esta dentro de uma árvore, primeiro é colocado o nomedaarvore.chavedevalor
      {
          "aula":{
            "fk_cod_materia":1,
            "nome_aula":"Aula Teste",
            "desc_aula":"Aula de teste cadastrada através do envio de um json pelo curl de Post",
            "dependencia_aula":1,
            "url_video_aula":"http://cdn.api.aceleraedu.com.br/media/cursox/materiax/video/nome-aula",
            "url_doc_aula":"http://cdn.api.aceleraedu.com.br/media/cursox/materiax/doc/nome-aula",
            "url_ppt_aula":"http://cdn.api.aceleraedu.com.br/media/cursox/materiax/ppt/nome-aula",
            "url_exerc_aula":"http://cdn.api.aceleraedu.com.br/media/cursox/materiax/exerc/nome-aula",
            "url_thumbnail":"http://cdn.api.aceleraedu.com.br/media/cursox/materiax/thumb/nome-aula"
          }
      } 
     */
    req.assert("aula.nome_aula","Nome do aula é obrigatório").notEmpty();
    req.assert("aula.desc_aula","Descrição do aula é obrigatório").notEmpty();
    req.assert("aula.url_video_aula","Favor realizar o upload do vídeo antes de cadastra-lo").notEmpty();
    req.assert("aula.url_doc_aula","Favor realizar o upload da apostila antes de cadastra-la").notEmpty();
    req.assert("aula.url_ppt_aula","Favor realizar o upload da apresentação antes de cadastra-la").notEmpty();
    req.assert("aula.url_exerc_aula","Favor realizar o upload dos exercicios antes de cadastra-los").notEmpty();
    req.assert("aula.url_thumbnail","Favor realizar o upload do thumbnail antes de cadastra-lo").notEmpty();

    var erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontrados');
      res.status(400).send(erros);
      return;
    }

    //o req.body recebe o nome da árvore de aula.
    var aula = req.body["aula"];
    console.log('Registrando um novo aula na base de dados');

    //Criando a conexão com BD
    var connection = app.models.connectionFactory();
    var AulasDao = new app.models.AulasDao(connection);

    //Fazendo o insert do json recebido no banco de dados
    AulasDao.salva(aula, function(erro, resultado){
      if(erro){
        console.log('Erro ao inserir aula no banco:' + erro);
        res.status(500).send(erro);
      } else {
      aula.cod_aula = resultado.insertId;
      console.log('Aula criado');

      //Criando uma chave de referência do aula pelo ID
      var memcachedClient = app.services.memcachedClient();
      memcachedClient.set('aula-' + aula.cod_aula, aula,
                60000, function(erro){
                  console.log('nova chave adicionada ao cache: aula-' + aula.cod_aula);
      });
        /* Hypermedia As The Engine Of Application State
        Possíves requisições após a criação de um usuario na aplicação
          *GET - Consulta
          *DELETE - Deletar
          *PUT - Atualizar
          *Post - Cadastrar
        */
        var response = {
        dados_do_aula: aula,
          links: [
            {
              href:"http://localhost:3000/aulas/aula/",
              rel:"Atualizar as informações da aula",
              method:"PUT"
            },
            {
              href:"http://localhost:3000/aulas/aula/" + aula.cod_aula,
              rel:"Deletar a aula",
              method:"DELETE"
            }
          ]
        }

       res.status(201).json(response);     
      }
    });
  });
}