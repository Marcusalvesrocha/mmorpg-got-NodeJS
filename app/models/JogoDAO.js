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

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg, tipo){
	this._conection.open(function(err, mongoClient){
		mongoClient.collection("jogo", function(err, collection){
			collection.find({usuario : usuario}).toArray(function(err, result){
				console.log(result);
				res.render('jogo', {img_casa: casa, jogo: result[0], msg: msg, tipo: tipo});

			});

			mongoClient.close();
		});
	});
}

JogoDAO.prototype.acao = function(acao){
	
	this._conection.open(function(err, mongoClient){
		mongoClient.collection("acao", function(err, collection){

			var date = new Date();
			var tempo = null;
			var minutos_para_segundo = 60 * 60000;

			switch(acao.acao) {
				case 1: tempo = 1 * minutos_para_segundo;
				case 2: tempo = 2 * minutos_para_segundo;
				case 3: tempo = 3 * minutos_para_segundo;
				case 4: tempo = 4 * minutos_para_segundo;
			}

			acao.acao_termina_em = date.getTime() + tempo;

			collection.insert(acao);

			mongoClient.close();


		});
	});
}


module.exports = function(){
	return JogoDAO;
}