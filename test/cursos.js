var express = require('../config/express')();
var request = require('supertest')(express);

describe('#CursosController', function () {

    //Limpeza da tabela
    /*beforeEach(function (done) {
        var conn = express.infra.connectionFactory();
        conn.query("DELETE FROM cursos", function (err, result) {
            if (!err) {
                done();
            }
        });
    });*/

    //Cadastro
    it('#Cadastro de curso com dados validos', function (done) {
        request.post('/cursos/curso')
            .send({curso:{
                nome_curso:"Curso deste automatizado2",
                desc_curso:"Inclusão de curso de teste.",
                valor_curso:"10.00"
            }}).expect(201, done);
    });


    //Cadastro com dados em campos em branco
    it('#Cadastro de curso com campos em branco', function (done) {
        request.post('/cursos/curso')
            .send({curso:{
                nome_curso:"",
                desc_curso:"Inclusão de curso de teste.",
                valor_curso:"10.00"
            }}).expect(400, done);
    });


    //Listagem
    /*it('#Listando todos os cursos', function (done) {
        request.get('/cursos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });*/



    //Listagem por ID
    it('#Consultando o curso com código 1', function (done) {
        request.get('/cursos/curso/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });    


    //Atualização de registro
    it('#Atualização de curso com o codigo 4', function (done) {
        request.put('/cursos/curso')
            .send({curso:{
                cod_curso: 4,
                nome_curso:"Curso deste automatizado update",
                desc_curso:"Inclusão de curso de teste.",
                valor_curso:"10.00"
            }}).expect(200, done);
    });
    

    //Deleção de registro
    it('#Deletando o curso com código 11', function (done) {
        request.delete('/cursos/curso/11')
            .set('Accept', 'application/json')
            .expect(204, done);
    });


});