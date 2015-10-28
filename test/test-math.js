/**
 * Test Math Module.
 * First install nodeunit globally with the following command
 * npm install -g nodeunit
 * Remember to test the fail!!!
 * Created by alex on 27/10/2015.
 */
var math = require('../modules/math');

exports.test_add = function (test) {
    test.equal(math.add(1, 1), 2);
    test.done();
};

exports.test_subtract = function (test) {
    test.equal(math.substract(2, 1), 1);
    test.done();
};
