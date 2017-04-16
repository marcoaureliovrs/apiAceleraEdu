var logger = require('../services/logger.js');

module.exports = function(app){
  app.get('/usuarios', function(req, res){
    console.log('Recebida requisicao de teste na porta 3000.')
    res.send('OK.');
  });

  app.get('/usuarios/usuario/:id', function(req, res){
    var id = req.params.id;
    console.log('consultando usuario: ' + id);

    logger.info('consultando usuario: ' + id);

    var memcachedClient = app.services.memcachedClient();

    memcachedClient.get('usuario-' + id, function(erro, retorno){
      if (erro || !retorno){
        console.log('MISS - chave nao encontrada');

        //Criando a conexão com BD
        var connection = app.models.connectionFactory();
        var UsuariosDao = new app.models.UsuariosDao(connection);

        //Buscando o usuario por ID
        UsuariosDao.buscaPorId(id, function(erro, resultado){
          if(erro){
            console.log('Erro ao consultar no banco: ' + erro);
            res.status(500).send(erro);
            return;
          }
          console.log('Usuario encontrado: ' + JSON.stringify(resultado));
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

//Método responsável por deletar o usuario na base de dados
  app.delete('/usuarios/usuario/:id', function(req, res){
    var usuario = {};
    var id = req.params.id;

    usuario.cod_usuario = id;

     //Criando a conexão com BD
    var connection = app.models.connectionFactory();
    var UsuariosDao = new app.models.UsuariosDao(connection);

    UsuariosDao.deleta(usuario, function(erro){
        if (erro){
          res.status(500).send(erro);
          return;
        }
        console.log('Usuario deletado');
        res.status(204).send(usuario);
    });
  });

//Método responsável por atualizar as informações do usuario
  app.put('/usuarios/usuario', function(req, res){

    //Validando os campos obrigatórios ao fazer atualização do usuário
    req.assert("usuario.nome_usuario","Nome do usuario é obrigatório").notEmpty();
    req.assert("usuario.nasc_usuario","Data de nascimento do usuario é obrigatório").notEmpty();
    req.assert("usuario.email_usuario","E-mail do usuario é obrigatório").notEmpty();
    req.assert("usuario.senha_usuario","Senha do usuario é obrigatório").notEmpty();

    var usuario = req.body["usuario"];

    //Criando a conexão com BD
    var connection = app.models.connectionFactory();
    var UsuariosDao = new app.models.UsuariosDao(connection);

    //Executando update no banco e passando a variável usuario como parâmetro
    UsuariosDao.atualiza(usuario, function(erro){
        if (erro){
          console.log('Erro ao atualizar usuario no banco:' + erro);
          res.status(500).send(erro);
          return;
        }
        console.log('Usuario atualizado');
        res.send(usuario);
    });

  });

  //Método responsável por registrar um usuario no sistema
  app.post('/usuarios/usuario', function(req, res){

    //Quando uma chave de valor esta dentro de uma árvore, primeiro é colocado o nomedaarvore.chavedevalor
    // {
    //"usuario":{
    //"nome_usuario":"Usuário de Teste",
    //"cpf_usuario":"40672767880",
    //"nasc_usuario":"26/07/1992",
    //"sexo_usuario":"Masculino",
    //"email_usuario":"teste@aceleraedu.com.br",
    //"senha_usuario":"teste@123",
    //"cod_nivel_usuario":"1"
    //}}
    req.assert("usuario.nome_usuario","Nome do usuario é obrigatório").notEmpty();
    req.assert("usuario.nasc_usuario","Data de nascimento do usuario é obrigatório").notEmpty();
    req.assert("usuario.email_usuario","E-mail do usuario é obrigatório").notEmpty();
    req.assert("usuario.senha_usuario","Senha do usuario é obrigatório").notEmpty();

    var erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontrados');
      res.status(400).send(erros);
      return;
    }

    //o req.body recebe o nome da árvore de usuario.
    var usuario = req.body["usuario"];
    console.log('Registrando um novo usuario na base de dados');

    //Criando a conexão com BD
    var connection = app.models.connectionFactory();
    var UsuariosDao = new app.models.UsuariosDao(connection);

    //Fazendo o insert do json recebido no banco de dados
    UsuariosDao.salva(usuario, function(erro, resultado){
      if(erro){
        console.log('Erro ao inserir usuario no banco:' + erro);
        res.status(500).send(erro);
      } else {
      usuario.cod_usuario = resultado.insertId;
      console.log('Usuario criado');

      //Criando uma chave de referência do usuario pelo ID
      var memcachedClient = app.services.memcachedClient();
      memcachedClient.set('usuario-' + usuario.cod_usuario, usuario,
                60000, function(erro){
                  console.log('nova chave adicionada ao cache: usuario-' + usuario.cod_usuario);
      });
        /* Hypermedia As The Engine Of Application State
        Possíves requisições após a criação de um usuario na aplicação
          *GET - Consulta
          *DELETE - Deletar
          *PUT - Atualizar
          *Post - Cadastrar
        */
        var response = {
        dados_do_usuario: usuario,
          links: [
            {
              href:"http://localhost:3000/usuarios/usuario/" + usuario.cod_usuario,
              rel:"Consultar usuario",
              method:"GET"
            },
            {
              href:"http://localhost:3000/usuarios/usuario/",
              rel:"Atualizar as informações do usuario",
              method:"PUT"
            },
            {
              href:"http://localhost:3000/usuarios/usuario/" + usuario.cod_usuario,
              rel:"Deletar o usuario",
              method:"DELETE"
            }
          ]
        }

       res.status(201).json(response);     
      }
    });
  });
}