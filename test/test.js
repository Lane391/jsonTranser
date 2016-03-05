/**
 * Created by dexter on 3/3/2016.
 */
require('mocha');
var transelater = require('../transer');

describe('TEST PART I', function () {

    var json_data;
    var options;

    it('show the json data: ', function (done) {
        json_data = {
            name1: 'jack',
            number: {"asdf":1}
        };
        done();
    });

    it('show the OPTION:', function (done) {
        options = {
            hasUl:true
        };
        done();
    });

    it('check the function', function (done) {
        var result = transelater(json_data, options);
        console.log(result);
        done();
    });
});