var httpModule = require('./modules/http-module');

var http = require('http');
var port = 8080;



http.createServer(httpModule.handle_requet).listen(port, '127.0.0.1');

console.log('Started Node.js http server listen at http://127.0.0.1:' + port);