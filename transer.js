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
        }
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
        if (options.hasUl) {
            var ret = '';
            if (Public._isArray(json_data)) {
                //json data is array
                console.log('is array');
                json_data.map(function (k, v) {

                });
            } else {
                ret = Public.__packageForObj(json_data, options);
                if (options.hasOwnProperty('hasUl')) {
                    out = out + ret;
                } else {
                    out = out + ret;
                }

            }
        } else {
            //hasUl of the option is false.

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
        return Object.prototype.toString.call(obj) === '[Object Array]';
    }

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
        if (typeof json_data === 'object') {
            var attrHTML = 'value="' + JSON.stringify(json_data) + '" ';


            if (options.hasOwnProperty('setClassName')) {
                attrHTML = attrHTML + 'class="' + options.setClassName + '" ';
            }

            var showContent = '';

            for (var jsonKeyName in json_data) {
                if (json_data.hasOwnProperty(jsonKeyName)) {
                    attrHTML = attrHTML + jsonKeyName + '="' + json_data[jsonKeyName] + '" ';
                    if (Public._checkOptions(options)) {
                        if (options.hasOwnProperty('render')) {
                            if (typeof options.render == 'function') {
                                showContent = showContent + options.render(jsonKeyName, json_data[jsonKeyName]) + ' ';
                            } else {
                                showContent = showContent + json_data[jsonKeyName] + ' ';
                            }
                        }

                    } else {
                        //no options
                    }
                }
            }

            if (!options.hasOwnProperty('setElement')) {
                return '<li ' + attrHTML + '>' + showContent + '</li>';
            } else {
                return '<' + options.setElement + ' ' + attrHTML + '>' + showContent + '</' + options.setElement + '>';
            }
        }
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