/* importar o mongodb */
var mongodb = require('mongodb');

var connMongoDB = function(){
		var db = new mongodb.Db(
		'got', //nome do banco de dados
		new mongo.Server(
			'localhost', //string contendo o endereço do servidor
			27017, //porta de conexão
			{}
		),
		{}
	);

	return db;
}

module.export = function(){
	return connMongoDB;
}