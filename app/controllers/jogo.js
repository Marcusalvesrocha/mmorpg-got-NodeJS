module.exports.jogo = function(application, req, res){
	if(req.session.autorizado){
		res.render('jogo', {img_casa: req.session.casa});
	} else {
		var erros = [{msg: "Faça o login ou cadastre para ter acesso ao jogo"}];
		res.render('index', {validacao: erros});
	}
}

module.exports.sair = function(application, req, res){
	req.session.destroy(function(err){
		var msg = [{msg: "Logof efetuado com sucesso"}];
		res.render("index", {validacao: {}, mensagem: msg});
	});
}