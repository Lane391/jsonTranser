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

    function _packageLi(json_data) {
        if (typeof json_data === 'object') {
            var attrHTML = '';
            for (var jsonKeyName in json_data) {
                attrHTML = attrHTML + '="' + json_data[jsonKeyName] + '" '
            }
        }
    }

    /**
     *
     * @param json_data
     * @param options
     * @returns {string}
     * @constructor
     */
    function JsonTranslate(json_data, options) {
        if (options.hasUL || typeof options.hasUL === 'undefined') {
            var out = '<ul>';
        } else {
            var out;
        }

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
                out = Public.__packageForObj(json_data, options);
            }
        }
        return out;
    }

    //  PRIVATE METHODS

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

    /**
     * package
     * @param json_data
     * @param options
     * @returns {string}
     * @private
     */
    Public.__packageForObj = function (json_data, options) {
        if (typeof json_data === 'object') {
            var attrHTML = 'value="' + JSON.stringify(json_data) + '" ';
            var showContent = '';
            for (var jsonKeyName in json_data) {
                attrHTML = attrHTML + jsonKeyName + '="' + json_data[jsonKeyName] + '" ';
                if (Public._checkOptions(options)) {
                    if (typeof options.render == 'function') {
                        showContent = showContent + options.render(jsonKeyName, json_data[jsonKeyName]) + ' ';
                    } else {
                        showContent = showContent + json_data[jsonKeyName] + ' ';
                    }
                } else {
                    console.log('no options');
                }
            }
            if (typeof options.setElement === 'undefined') {
                return '<li ' + attrHTML + '>' + showContent + '</li>';
            } else {
                return '<' + options.setElement + attrHTML + '>' + showContent + '</' + options.setElement + '>';
            }

        }
    }

    /**
     *
     * @param options
     * @returns {boolean}
     * @private
     */
    Public.__checkOptions = function (options) {
        return (typeof options != 'undefined');
    }


    if (isNode) {
        module.exports = Public;
    } else {
        window[publicName] = Public;
    }

})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);