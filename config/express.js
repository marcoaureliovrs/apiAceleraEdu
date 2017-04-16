var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var morgan = require('morgan');
var logger = require('../services/logger.js');


//middleware de log da aplicação, utiliza o modulo logger
module.exports = function(){
  var app = express();

  app.use(morgan("common", {
    stream: {
      write: function(mensagem){
          logger.info(mensagem);
      }
    }
  }));

  //middleware para reconhecimento do body da página 
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(expressValidator());

//Carregando os modulos da aplicação
  consign()
   .include('controllers')
   .then('models')
   .then('services')
   .into(app);

  return app;
}
