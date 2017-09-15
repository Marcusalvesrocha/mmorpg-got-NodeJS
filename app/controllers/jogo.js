module.exports.jogo = function(application, req, res){
	
	if(req.session.autorizado !== true){
		var erros = [{msg: "Faça o login ou cadastre para ter acesso ao jogo"}];
		res.render('index', {validacao: erros, mensagem: {}});
		return;
	}

	var msg = '';
	var tipo = '';

	if(req.query.msg == 'S'){
		tipo = 'success';
		msg = 'Ação começou a ser realizada';
	} else {
		if(req.query.msg == 'I'){
			tipo = 'danger';
			msg = 'Operação inválida, todos os campos tem que ser preenchido!';
		}
	}

	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.iniciaJogo(res, req.session.usuario, req.session.casa, msg, tipo);

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
		//res.render('index', {validacao: erros, mensagem: {}});
		throw new Exception("Error message");
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

	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.getAcoes(res, req.session.usuario);

}

module.exports.ordernarAcaoSuditos = function(application, req, res){
	
	var dadosForm = req.body;

	req.assert('acao', 'Ação deve ser informada').notEmpty();
	req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.redirect('jogo?msg=I');
		return;
	}

	dadosForm.usuario = req.session.usuario;

	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.acao(dadosForm);

	res.redirect('jogo?msg=S');
	
}