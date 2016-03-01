/**
 * json Translate to HTML or something else
 * author: robinwong51@qq.com
 * 2016/02/29
 */
;(function (isNode) {
    'use strict';

    /**
     *
     * @param jsonData
     * @param options
     * @returns {*}
     * @constructor
     */
    var Public = function (jsonData, options) {
        return JsonTranslate(jsonData, options)
    }, publicName = 'jsonTrans';

    /**
     *
     * @param json_data
     * @param options
     * @returns {string}
     * @constructor
     */
    function JsonTranslate(json_data, options) {

        var out = '<ul>';

        //SET OPTIONS
        if (options.formate == 'undefined') {
            options.formate = 'ul';
        }

        if (options.className == 'undefined') {
            options.className = '';
        }

        var translateData = function (input_value) {
            if (typeof options.translateValue === 'function') {
                options.translateValue(input_value);
            }
        };

        //RENDER ul elements
        if (options.formate == 'ul') {
            if (Public._isArray(json_data)) {
                //json data is array
                json_data.map(function (k, v) {

                });
            } else {
                //json data is not array
                out = out + '<li class="' + options.className + '">';
                for (var jsonKeyName in json_data) {
                    out = out + json_data[jsonKeyName] + '' ;
                }

                

            }
        }
        return out;
    }

    /**
     * is array? [private method]
     * @param obj
     * @returns {boolean}
     * @private
     */
    Public._isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[Object Array]';
    }

    /**
     * count the json size
     * @param obj
     * @returns {Number}
     * @private
     */
    Public._count = function (obj) {
        return Objec.keys(obj).length;
    }


    if (isNode) {
        module.exports = Public;
    } else {
        window[publicName] = Public;
    }

})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);