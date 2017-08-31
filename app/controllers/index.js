module.exports.index = function(application, req, res){
	res.render('index', {validacao: {}});
}

module.exports.autenticar = function(application, req, res){

	var dadosForm = req.body;

	req.assert('usuario', 'Usuário na deve estar vazio').notEmpty();
	req.assert('senha', 'Senha na deve estar vazia').notEmpty();

	var erros = req.validationErrors();

	if(erros) {
		res.render("index", {validacao: erros});
		return
	}

	res.send('criar sessão');
	
	//res.render('index');
}