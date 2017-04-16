function CursosDao(connection) {
    this._connection = connection;
}

CursosDao.prototype.salva = function (curso, callback) {
    this._connection.query('INSERT INTO tbl_curso SET ?', curso, callback);
    this._connection.end();
}

CursosDao.prototype.atualiza = function (curso, callback) {
    this._connection.query('UPDATE tbl_curso SET nome_curso = ?, desc_curso = ? WHERE cod_curso = ?', [curso.nome_curso, curso.desc_curso, curso.cod_curso], callback);
   	this._connection.end();
}

CursosDao.prototype.lista = function (callback) {
    this._connection.query('SELECT * FROM tbl_curso', callback);
}

CursosDao.prototype.buscaPorNome = function (nome_curso, callback) {
    this._connection.query("SELECT * FROM tbl_curso WHERE nome_curso like ?", '%'+[nome_curso]+'%', callback);
    this._connection.end();
}

CursosDao.prototype.buscaPorDescricao = function (desc_curso, callback) {
    this._connection.query("SELECT * FROM tbl_curso WHERE desc_curso like ? ", '%'+[desc_curso]+'%', callback);
    this._connection.end();
}

CursosDao.prototype.buscaPorId = function (cod_curso, callback) {
    this._connection.query("SELECT * FROM tbl_curso WHERE cod_curso = ?", [cod_curso], callback);
    this._connection.end();
}

CursosDao.prototype.deleta = function (curso, callback) {
    this._connection.query("DELETE FROM tbl_curso WHERE cod_curso = ?", [curso.cod_curso], callback);
    this._connection.end();
}

module.exports = function () {
    return CursosDao;
};
