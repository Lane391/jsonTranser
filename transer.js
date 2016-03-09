/**
 * json Translate to HTML or something else
 *
 * author: robinwong51@qq.com
 * 2016/02/29
 * - OPTIONS:
 *  - hasUl: do u get 'ul' tag.
 *  - tag: the json will packing which the tag
 *  - format: HTML or XML, the default is HTML(ul)
 *  - setName: set the which show in HTML page
 *  - setClassName: set the class name of HTML element
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
     * main function
     * @param json_data
     * @param options
     * @returns {string}
     * @constructor
     */
    function JsonTranslate(json_data, options) {
        var out = '';

        //check options
        var __checkOptions = function (options) {

            if (typeof options == 'undefined') {
                options = {};
            }

            if (options.hasOwnProperty('hasUl')) {
                out = '<ul>';
                options.setElement = 'li';
            } else {
                out = '';
            }

            if (!options.hasOwnProperty('setClassName')) {
                options.setClassName = false;
            }

            if (!options.hasOwnProperty('render')) {
                options.render = false;
            }

            if (!options.hasOwnProperty('setElement')) {
                options.setElement = false;
            }

            if (!options.hasOwnProperty('standardDesc')) {
                options.standardDesc = false;
            }

            return options;
        };
        __checkOptions(options);

        /**
         *
         * @param input_value
         * @returns {*}
         */
        var cb = function (input_value) {
            if (options.hasOwnProperty('callback')) {
                if (typeof options.callback === 'function') {
                    return options.callback(input_value);
                }
            } else {
                return input_value;
            }
        };

        //RENDER ul elements

        var ret = '';
        if (Public._isArray(json_data)) {
            //json data is array
            ret = Public.__packageForArray(json_data, options);
        } else {
            ret = Public.__packageForObj(json_data, options);
            //console.log(ret)
        }
        out = out + ret;
        if (options.hasUl){
            out = out + '</ul>';
        }
        //console.log(out);
        return cb(out);
    }

    //===================  PRIVATE METHODS  ===================

    /**
     * is array? [private method]
     * @param obj
     * @returns {boolean}
     * @private
     */
    Public._isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /**
     * is object?
     * @param obj
     * @returns {boolean}
     * @private
     */
    Public._isObject = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };

    Public._isString = function (obj) {
        return Object.protoptype.toString.call(obj) === '[object String]';
    };

    Public._isNumber = function (obj) {
        return Object.protoptype.toString.call(obj) === '[object Number]';
    };

    /**
     * count the json size
     * @param obj
     * @returns {Number}
     * @private
     */
    Public._count = function (obj) {
        return Object.keys(obj).length;
    }

    /**
     * package
     * @param json_data
     * @param options
     * @returns {string}
     * @private
     */
    Public.__packageForObj = function (json_data, options) {
        //console.log(Object.prototype.toString.call(json_data));
        if (Public._isObject(json_data)) {
            var attrHTML = 'value="' + JSON.stringify(json_data) + '" ';
            var showContent = '';

            if (options.hasOwnProperty('setClassName')) {
                attrHTML = attrHTML + 'class="' + options.setClassName + '" ';
            }
            for (var jsonKeyName in json_data) {
                if (json_data.hasOwnProperty(jsonKeyName)) {
                    if (Public._isObject(json_data[jsonKeyName])) {
                        Public.__packageForObj(json_data[jsonKeyName], options);
                    } else if (Public._isArray(json_data[jsonKeyName])) {
                        Public.__packageForArray(json_data[jsonKeyName], options);
                    } else {
                        attrHTML = attrHTML + jsonKeyName + '="' + json_data[jsonKeyName] + '" ';
                        if (options.hasOwnProperty('render')) {
                            if (typeof options.render == 'function') {
                                showContent = showContent + options.render(jsonKeyName, json_data[jsonKeyName]) + ' ';
                            } else {
                                showContent = showContent + json_data[jsonKeyName] + ' ';
                            }
                        }
                    }
                }
            }

            return '<' + options.setElement + ' ' + attrHTML + '>' + showContent + '</' + options.setElement + '>';
        } else {
            console.log('no obj');
        }
    }

    Public.__packageForArray = function (array_object, options) {
        var ret_arr = '';
        array_object.map(function (ele) {
            ret_arr = ret_arr + Public.__packageForObj(ele, options);
        });
        return ret_arr;
    }

    /**
     *
     * @param options
     * @returns {boolean}
     * @private
     */
    Public._checkOptions = function (options) {
        return (typeof options != 'undefined');
    }

    if (isNode) {
        module.exports = Public;
    } else {
        window[publicName] = Public;
    }

})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);