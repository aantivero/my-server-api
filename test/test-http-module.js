/**
 * Working with mock objects and sinon.js
 * To verify the test I execute this file with nodeunit
 *
 * Created by alex on 27/10/2015.
 */
var sinon = require('sinon');
exports.test_handle_GET_request = function (test) {
    var response = {
        'writeHead' : function () {},
        'end': function () {}
    };
    var responseMock = sinon.mock(response);
    responseMock.expects('end').once().withArgs('GET action was requested');
    responseMock.expects('writeHead').once().withArgs(200, {
        'Content-Type': 'text/plain'
    });

    var request = {};
    var requestMock = sinon.mock(request);
    requestMock.method = 'GET';

    var http_module = require('../modules/http-module');
    http_module.handle_requet(requestMock, response);
    responseMock.verify();
    test.done();
};



