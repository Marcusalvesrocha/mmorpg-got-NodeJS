module.exports.jogo = function(application, req, res){
	if(req.session.autorizado){
		res.render('jogo');
	} else {
		var erros = [{msg: "Faça o login ou cadastre para ter acesso ao jogo"}];
		res.render('index', {validacao: erros});
	}
}

module.exports.sair = function(application, req, res){
	req.session.destroy(function(err){
		res.render("index", {validacao: {}})
	});
}