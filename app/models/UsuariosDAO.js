function UsuariosDAO(connection){
	this._conection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
	this._conection.open(function(err, mongoClient){
		mongoClient.collection("usuarios", function(err, collection){
			collection.insert(usuario);

			mongoClient.close();
		});
	});
}

module.exports = function(){
	return UsuariosDAO;
}