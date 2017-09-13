module.exports.jogo = function(application, req, res){
	
	if(req.session.autorizado !== true){
		var erros = [{msg: "Faça o login ou cadastre para ter acesso ao jogo"}];
		res.render('index', {validacao: erros, mensagem: {}});
		return;
	}

	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa);

}

module.exports.suditos = function(application, req, res){
	
		res.render("aldeoes", {validacao: {}, mensagem: {}});
}

module.exports.pergaminhos = function(application, req, res){
	
		res.render("pergaminhos", {validacao: {}, mensagem: {}});
	
}