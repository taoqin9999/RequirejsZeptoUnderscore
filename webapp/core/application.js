define(function(require, exports, module) {
    'use strict';

    /**
     * '#home': {---url后的地址如：www.baidu.com#home
            'viewId': '#test',-----模块div的ID
            'controller': require('module/js/test'),----模块js
            'view': require('text!module/view/test.html')-----模块html
        }
     * [routes description]
     * @type {Object}
     */
    var routes = {
        '#home': {
            'viewId': '#test',
            'controller': require('module/js/test'),
            'view': require('text!module/view/test.html')
        },
        '#bottom': {
            'viewId': '#bottom',
            'controller': require('module/js/bottom'),
            'view': require('text!module/view/bottom.html')
        },
        '#home/test1': {
            'viewId': '#test1',
            'controller': require('module/js/test1'),
            'view': require('text!module/view/test1.html')
        }
    };

    exports = module.exports = {
        getView: function(url) {
            return routes[url];
        }
    };
});
