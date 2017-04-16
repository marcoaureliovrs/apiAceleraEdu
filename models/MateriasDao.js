function MateriasDao(connection) {
    this._connection = connection;
}

MateriasDao.prototype.salva = function (materia, callback) {
    this._connection.query('INSERT INTO tbl_materia SET ?', materia, callback);
    this._connection.end();
}

MateriasDao.prototype.atualiza = function (materia, callback) {
    this._connection.query('UPDATE tbl_materia SET  cod_curso_relacionado = ?, nome_materia = ?, desc_materia = ? WHERE cod_materia = ?', [materia.cod_curso_relacionado, materia.nome_materia, materia.desc_materia, materia.cod_materia], callback);
    this._connection.end();
}

MateriasDao.prototype.lista = function (callback) {
    this._connection.query('SELECT * FROM tbl_materia', callback);
    this._connection.end();
}

MateriasDao.prototype.buscaPorId = function (id, callback) {
    this._connection.query("SELECT * FROM tbl_materia WHERE cod_materia = ?", [id], callback);
    this._connection.end();
}

MateriasDao.prototype.deleta = function (materia, callback) {
    this._connection.query("DELETE FROM tbl_materia WHERE cod_materia = ?", [materia.cod_materia], callback);
    this._connection.end();
}

module.exports = function () {
    return MateriasDao;
};
