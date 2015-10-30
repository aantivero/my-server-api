/**
 * Contacts API
 * Created by alex on 27/10/2015.
 */

var fs = require('fs')

function read_json_file () {
    var file = '../data/contacts.json';
    return  fs.readFileSync(file);
}

exports.list = function () {
    return JSON.parse(read_json_file());
}

exports.query = function (number) {
    var json_result = JSON.parse(read_json_file());
    var result = json_result.result;

    for (var i =0; i < result.length; i++) {
        var contact = result[i];
        if (contact.primarycontactnumber == number) {
            return contact;
        }
    }

    return null;
}

exports.query_by_arg = function (arg, value) {
    var json_result = JSON.parse(read_json_file());
    var result = json_result.result;

    for (var i = 0)
}