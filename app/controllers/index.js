module.exports.index = function(application, req, res){
	res.render('index', {validacao: {}, mensagem: {}});
}

module.exports.autenticar = function(application, req, res){

	var dadosForm = req.body;

	req.assert('usuario', 'Usuário não deve estar vazio').notEmpty();
	req.assert('senha', 'Senha na deve estar vazia').notEmpty();

	var erros = req.validationErrors();

	if(erros) {
		res.render("index", {validacao: erros});
		return
	}

	var connection = application.config.dbConnection;
	var usuariosDAO = new application.app.models.UsuariosDAO(connection);

	usuariosDAO.autenticar(dadosForm, req, res);

	//console.log("Autenticado ", autenticado);
	
	//res.render(autorizado, {validacao: {}});
}