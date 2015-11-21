/**
 * I use mongoose to connects Node.js to MongoDB.
 * Implement a CRUD functionality
 * Created by alex on 15/11/2015.
 */
var mongoose = require('mongoose');
//define a schema
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
var john_doe = new Contact({
    firstname: "John",
    lastname: "Doe",
    title: "Mr.",
    company: "Dev Inc.",
    jobtitle: "Developer",
    primarycontactnumber: "123456789",
    othercontactnumbers: [],
    primaryemailaddress: "john.doe@abc.com",
    emailaddresses: ["abc1@xyz.com"],
    groups: ["Dev"]
});
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/contacts');
john_doe.save(function(error){
   if (error) {
       console.log('Error while saving contact for john doe');
       console.log(error);
       return;
   } else {
       john_doe.save();
       console.log('Contact john doe successfully stored');
       return;
   }
});
/*Contact.find({groups: 'Dev', title: 'Mr.'}, function(error, result){
    if (error) {
        console.error(error);
        return;
    } else {
        console.log(result);
        return;
    }
});*/
Contact.findOne({primarycontactnumber: '123456789'}, function(error, data){
    if (error) {
        console.log(error);
        return;
    } else {
        if (!data) {
            console.log('not found');
        } else {
            data.remove(function(error){
                if (!error) {
                    data.remove();
                    console.log('Contact john doe removed successfully');
                } else {
                    console.log(error);
                }
            });
        }
    }
});