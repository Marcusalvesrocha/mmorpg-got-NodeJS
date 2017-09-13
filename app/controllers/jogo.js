module.exports.jogo = function(application, req, res){
	
	if(req.session.autorizado !== true){
		var erros = [{msg: "Faça o login ou cadastre para ter acesso ao jogo"}];
		res.render('index', {validacao: erros, mensagem: {}});
		return;
	}

	var comando_invalido = 'N';

	if(req.query.comando_invalido == 'S'){
		comando_invalido = 'S';
	}

	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa, comando_invalido);

}

module.exports.sair = function(application, req, res){
	req.session.destroy(function(err){
		var msg = [{msg: "Faça o login ou cadastre para ter acesso ao jogo"}];
		res.render('index', {validacao: {}, mensagem: msg});
	});
}

module.exports.suditos = function(application, req, res){
	
	if(req.session.autorizado !== true){
		var erros = [{msg: "Faça o login ou cadastre para ter acesso ao jogo"}];
		res.render('index', {validacao: erros, mensagem: {}});
		return;
	}

	res.render("aldeoes", {validacao: {}, mensagem: {}});
}

module.exports.pergaminhos = function(application, req, res){
	
	if(req.session.autorizado !== true){
		var erros = [{msg: "Faça o login ou cadastre para ter acesso ao jogo"}];
		res.render('index', {validacao: erros, mensagem: {}});
		return;
	}
	
	res.render("pergaminhos", {validacao: {}, mensagem: {}});
}

module.exports.ordernarAcaoSuditos = function(application, req, res){
	
	var dadosForm = req.body;

	req.assert('acao', 'Ação deve ser informada').notEmpty();
	req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.redirect('jogo?comando_invalido=S');
		return;
	}
	console.log(dadosForm);
	res.send('tudo ok!');
	
}