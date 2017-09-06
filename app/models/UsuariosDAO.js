function UsuariosDAO(connection){
	this._conection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario) {
	this._conection.open(function(err, mongoClient){
		mongoClient.collection("usuarios", function(err, collection){
			collection.insert(usuario);

			mongoClient.close();
		});
	});
}

UsuariosDAO.prototype.autenticar = function(usuario,req, res) {
	this._conection.open(function(err, mongoClient){
		mongoClient.collection("usuarios", function(err, collection){
			collection.find(usuario).toArray(function(err, result){

				if (result[0] != undefined) {
					req.session.autorizado = true;

					req.session.usuario = result[0].usuario;
					req.session.casa = result[0].casa;
				}

				if (req.session.autorizado) {
					res.redirect("jogo");
				} else {
					var erros = [{msg: "Usuário ou senha não encontrado!"}]
					res.render("index", {validacao: erros});
				}

			});

			mongoClient.close();
		});
	});
}

module.exports = function(){
	return UsuariosDAO;
}