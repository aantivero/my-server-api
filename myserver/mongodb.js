/**
 * Created by alex on 15/11/2015.
 */

var express = require('express')
 , http = require('http')
 , path = require('path')
 , bodyParser = require('body-parser')
 , logger = require('morgan')
 , methodOverride = require('method-override')
 , errorHandler = require('errorhandler')
 , mongoose = require('mongoose')
 , dataservice = require('./modules/contactdataservice');

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

app.get('/contacts/:number', function (req, res) {
    console.log(req.url + ' : querying for ' + req.params.number);
    dataservice.findByNumber(Contact, req.params.number, res);
});

app.post('/contacts', function (req, res) {
    dataservice.update(Contact, req.body, res);
});

app.put('/contacts', function (req, res) {
    dataservice.create(Contact, req.body, res);
});

app.delete('/contacts/:primarycontactnumber', function (req, res) {
    dataservice.remove(Contact, req.params.primarycontactnumber, res);
});

app.get('/contacts', function (req, res) {
    dataservice.list(Contact, res);
});

console.log('Running at port ' + app.get('port'));
http.createServer(app).listen(app.get('port'));