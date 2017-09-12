function JogoDAO(connection){
	this._conection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario){
	this._conection.open(function(err, mongoClient){
		mongoClient.collection("jogo", function(err, collection){
			collection.insert({
				usuario: usuario,
				moeda: 15,
				subitos: 10,
				temor: Math.floor(Math.random()*1000),
				sabedoria: Math.floor(Math.random()*1000),
				comercio: Math.floor(Math.random()*1000),
				magia: Math.floor(Math.random()*1000)
			});

			mongoClient.close();
		});
	});
}


module.exports = function(){
	return JogoDAO;
}