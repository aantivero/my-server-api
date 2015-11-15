/**
 * Express server with snippet instanties LevelDB and insert dummy data,
 * also expose a /contacts/:number route return json
 * Created by alex on 15/11/2015.
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , logger = require('morgan')
  , methodOverride = require('method-override')
  , errorHandler = require('errorhandler')
  , levelup = require('levelup');

var app = express();
var url = require('url');
//all enviroments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(methodOverride());
app.use(bodyParser.json());
//development only
if ('development' === app.get('env')) {
    app.use(errorHandler());
}

var db = levelup('./contact', {valueEncoding: 'json'});

app.get('/contacts/:number', function(req, res){
    console.log(req.url + ': querying for ' + req.params.number);
    db.get(req.params.number, function (error, data) {
        if (error) {
            res.writeHead(404, {'Content-Type':'text/plain'});
            res.end('Not Found');
            return;
        }
        res.setHeader('content-type', 'application/json');
        res.send(data);
    });
});
app.post('/contacts/:number', function (req, res) {
    console.log('Adding new contact with primary number ' + req.params.number);
    db.put(req.params.number, req.body, function (error) {
        if (error) {
            res.writeHead(500, {'Conten-Type':'text/plain'});
            res.end('Internal server error');
            return;
        }
        res.send(req.params.number + ' succesfully inserted');
    });
});
app.delete('/contacts/:number', function (req, res) {
    console.log('Delete contact with primary number ' + req.params.number);
    db.del(req.params.number, function (error) {
        if (error) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal server error');
            return;
        }
        res.send(req.params.number + ' successfully deleted');
    });
});
app.get('/contacts', function (req, res) {
   console.log('Listing all contacts');
    var is_first = true;
    res.setHeader('content-type', 'application/json');
    db.createReadStream().on('data', function (data) {
        console.log(data.value);
        if (is_first == true) {
            res.write('[');
        } else {
            res.write(',');
        }
        res.write(JSON.stringify(data.value));
        is_first = false;
    }).on('error', function (error) {
        console.log('Error whiling reading. ' + error);
    }).on('close', function () {
        console.log('Closing db stream');
    }).on('end', function () {
        console.log('Db stream closed');
        res.end(']');
    })
});
console.log('Running at port ' + app.get('port'));
http.createServer(app).listen(app.get('port'));