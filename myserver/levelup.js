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
db.put('+359777123456', {
    "firstname": "Joe",
    "lastname": "Smith",
    "title": "Mr.",
    "company": "Dev Inc.",
    "jobtitle": "Developer",
    "primarycontactnumber": "+359777123456",
    "othercontactnumbers": [
        "+359777456789",
        "+359777112233"],
    "primaryemailaddress": "joe.smith@xyz.com",
    "emailaddresses": [
        "j.smith@xyz.com"],
    "groups": ["Dev","Family"]
});
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
console.log('Running at port ' + app.get('port'));
http.createServer(app).listen(app.get('port'));