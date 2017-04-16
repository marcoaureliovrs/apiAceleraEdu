var mysql = require('mysql');

function createDBConnection() {

		return mysql.createConnection({
        	host: 'aceleraedu.mysql.dbaas.com.br',
        	user: 'aceleraedu',
        	password: 'AceleraBD1020',
        	database: 'aceleraedu'
    	});

    if (process.env.NODE_ENV =='test') {
    	return mysql.createConnection({
        	host: 'aceleraedudev.mysql.dbaas.com.br',
        	user: 'aceleraedudev',
        	password: 'loca1020',
        	database: 'aceleraedudev'
    	});
    }
}

module.exports = function () {
    return createDBConnection;
}
