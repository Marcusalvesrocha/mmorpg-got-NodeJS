var ObjectID = require('mongodb').ObjectId;

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
			var minutos_para_segundo = 60 * 6000;

			switch(parseInt(acao.acao)) {
				case 1: tempo = 1 * minutos_para_segundo; break;
				case 2: tempo = 2 * minutos_para_segundo; break;
				case 3: tempo = 3 * minutos_para_segundo; break;
				case 4: tempo = 4 * minutos_para_segundo; break;
			}

			acao.acao_termina_em = date.getTime() + tempo;

			collection.insert(acao);


		});

		mongoClient.collection("jogo", function(err, collection){

			var moedas = null;

			switch(parseInt(acao.acao)){
				case 1: moedas = -2 * acao.quantidade; break; 
				case 2: moedas = -3 * acao.quantidade; break; 
				case 3: moedas = -1 * acao.quantidade; break; 
				case 4: moedas = -1 * acao.quantidade; break; 
			}

			collection.update(
				{ usuario: acao.usuario},
				{ $inc: {moeda: moedas}}
			);

			mongoClient.close();

		});
	});
}

JogoDAO.prototype.getAcoes = function(res, usuario){
	
	this._conection.open(function(err, mongoClient){
		mongoClient.collection("acao", function(err, collection){

			var date = new Date();
			var momento_atual = date.getTime();

			collection.find({usuario : usuario, acao_termina_em: {$gt:momento_atual}}).toArray(function(err, result){

				console.log(result);
				res.render("pergaminhos", {validacao: {}, mensagem: {}, acoes: result});
				//res.render('jogo', {img_casa: casa, jogo: result[0], msg: msg, tipo: tipo});

			});

			mongoClient.close();
		});
	});
}

JogoDAO.prototype.revogarAcao = function(_id, res){
	
	this._conection.open(function(err, mongoClient){
		mongoClient.collection("acao", function(err, collection){

			collection.remove(
				{_id : ObjectID(_id)},
				function(err, result){
					res.redirect("jogo?msg=R");
				}
			);
			mongoClient.close();
		});
	});
}


module.exports = function(){
	return JogoDAO;
}