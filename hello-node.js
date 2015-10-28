var http = require('http');
var port = 8080;

function handle_request (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.end('Hello Server API - restful next\n');
    console.log('requested');
}

http.createServer(handle_request).listen(port, '127.0.0.1');

console.log('Started Node.js http server listen at http://127.0.0.1:' + port);