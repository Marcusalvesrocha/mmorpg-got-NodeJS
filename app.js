/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(1234, function(){
	console.log('Servidor online');
})