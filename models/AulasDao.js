/* Classe AulasDAO

    {"aula":{
    "fk_cod_materia":
    "nome_aula":
    "desc_aula":
    "dependencia_aula":
    "url_video_aula":
    "url_doc_aula":
    "url_ppt_aula":
    "url_exerc_aula":
    "url_thumbnail":
    }}

 */

function AulasDao(connection) {
    this._connection = connection;
}

AulasDao.prototype.salva = function (aula, callback) {
    this._connection.query('INSERT INTO tbl_aula SET ?', aula, callback);
    this._connection.end();
}

AulasDao.prototype.atualiza = function (aula, callback) {
    this._connection.query('UPDATE tbl_aula SET fk_cod_materia=?, nome_aula=?, desc_aula=?, dependencia_aula=?, url_video_aula=?, url_doc_aula=?, url_ppt_aula=?, url_exerc_aula=?, url_thumbnail=? WHERE cod_aula=?',[aula.fk_cod_materia, aula.nome_aula, aula.desc_aula, aula.dependencia_aula, aula.url_video_aula, aula.url_doc_aula, aula.url_ppt_aula, aula.url_exerc_aula, aula.url_thumbnail, aula.cod_aula], callback);
    this._connection.end();
}

AulasDao.prototype.lista = function (callback) {
    this._connection.query('SELECT * FROM tbl_aula', callback);
    this._connection.end();
}

AulasDao.prototype.listaPorMateria = function (cod_materia, callback) {
    this._connection.query('SELECT * FROM tbl_aula WHERE fk_cod_materia = ?', cod_materia, callback);
    this._connection.end();
}

AulasDao.prototype.buscaPorId = function (cod_aula, callback) {
    this._connection.query("SELECT * FROM tbl_aula WHERE cod_aula = ?", [cod_aula], callback);
    this._connection.end();
}

AulasDao.prototype.deleta = function (aula, callback) {
    this._connection.query("DELETE FROM tbl_aula WHERE cod_aula = ?", [aula.cod_aula], callback);
    this._connection.end();
}


module.exports = function () {
    return AulasDao;
};