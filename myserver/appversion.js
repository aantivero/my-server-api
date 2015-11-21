/**
 * API with version
 * Created by alex on 21/11/2015.
 */
var express = require('express')
    , http = require('http')
    , path = require('path')
    , bodyParser = require('body-parser')
    , logger = require('morgan')
    , methodOverride = require('method-override')
    , errorHandler = require('errorhandler')
    , mongoose = require('mongoose')
    , v1 = require('./modules/contactdataservice_1')
    , v2 = require('./modules/contactdataservice_2');

var app = express();
var url = require('url');

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(methodOverride());
app.use(bodyParser.json());

//development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

mongoose.connect('mongodb://localhost/contacts');

var contactSchema = new mongoose.Schema({
    primarycontactnumber: {type: String, index: {unique: true}},
    firstname: String,
    lastname: String,
    title: String,
    company: String,
    jobtitle: String,
    othercontactnumbers: [String],
    primaryemailaddress: String,
    emailaddresses: [String],
    groups: [String]
});

var Contact = mongoose.model('Contact', contactSchema);

app.get('/v1/contacts/:number', function (req, res) {
    console.log(req.url + ' : querying for ' + req.params.number);
    v1.findByNumber(Contact, req.params.number, res);
});

app.post('/v1/contacts', function (req, res) {
    v1.update(Contact, req.body, res);
});

app.put('/v1/contacts', function (req, res) {
    v1.create(Contact, req.body, res);
});

app.delete('/v1/contacts/:primarycontactnumber', function (req, res) {
    v1.remove(Contact, req.params.primarycontactnumber, res);
});

app.get('/contacts', function (req, res) {
   var get_params = url.parse(req.url, true).query;
    if (Object.keys(get_params).length == 0) {
        v2.list(Contact, res);
    } else {
        var key = Object.keys(get_params)[0];
        var value = get_params[key];
        v2.query_by_arg(Contact, key, value, res);
    }
});
/*
app.get('/v1/contacts', function (req, res) {
    v1.list(Contact, res);
});

app.get('/contacts', function(req, res) {
    res.writeHead(301, {'Location':'/v2/contacts'});
    res.end('Version 2 is moved to /contacts/: ');
});
*/
console.log('Running at port ' + app.get('port'));
http.createServer(app).listen(app.get('port'));