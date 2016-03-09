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
            id: 'linux',
            class: 'dot',
            value:{
                id:'windows',
                class:'filt',
                value:'superman'
            }
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
        console.log(json_data);
        console.log(options);
        var result = transelater(json_data, options);
        console.log(result);
        done();
    });
});

describe('TEST SET CLASS NAME AND THE OTHER OPTIONS ITEMS', function() {
    it('check_data',function(done){
        done();
    })
});