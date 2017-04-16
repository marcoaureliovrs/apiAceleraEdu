/*Classe UsuariosDao

    {"usuario":{
    "nome_usuario":"Usuário de Teste",
    "cpf_usuario":"40672767880",
    "nasc_usuario":"26/07/1992",
    "sexo_usuario":"Masculino",
    "email_usuario":"teste@aceleraedu.com.br",
    "senha_usuario":"teste@123",
    "cod_nivel_usuario":"1"
    }}
 */

function UsuariosDao(connection) {
    this._connection = connection;
}

UsuariosDao.prototype.salva = function (usuario, callback) {
    this._connection.query('INSERT INTO tbl_usuario SET ?', usuario, callback);
    this._connection.end();
}

UsuariosDao.prototype.atualiza = function (usuario, callback) {
    this._connection.query('UPDATE tbl_usuario SET nome_usuario=?, cpf_usuario=?, nasc_usuario=?, sexo_usuario=?, cod_nivel_usuario=? WHERE cod_usuario=?', [usuario.nome_usuario, usuario.cpf_usuario, usuario.nasc_usuario, usuario.sexo_usuario, usuario.cod_nivel_usuario, usuario.cod_usuario], callback);
    this._connection.end();
}

UsuariosDao.prototype.lista = function (callback) {
    this._connection.query('SELECT * FROM tbl_usuario', callback);
    this._connection.end();
}

UsuariosDao.prototype.buscaPorId = function (cod_usuario, callback) {
    this._connection.query("SELECT * FROM tbl_usuario WHERE cod_usuario = ?", [cod_usuario], callback);
    this._connection.end();
}

UsuariosDao.prototype.deleta = function (usuario, callback) {
    this._connection.query("DELETE FROM tbl_usuario WHERE cod_usuario = ?", [usuario.cod_usuario], callback);
    this._connection.end();
}

module.exports = function () {
    return UsuariosDao;
};