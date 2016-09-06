define(function(require, exports, module) {
    'use strict';

    /**
     *
     * [routes description]
     * @type {Object}
     */
    var routes = {
        'home': {
            'controller': require('module/js/home'),
            'view': require('text!module/view/home.html')
        },
        'homeContent': {
            'controller': require('module/js/homeContent'),
            'view': require('text!module/view/homeContent.html')
        },
        'life': {
            'controller': require('module/js/life'),
            'view': require('text!module/view/life.html')
        },
        'personal': {
            'controller': require('module/js/personal'),
            'view': require('text!module/view/personal.html')
        },
        'neighbor': {
            'controller': require('module/js/neighbor'),
            'view': require('text!module/view/neighbor.html')
        },
        'scanIt': {
            'controller': require('module/js/ScanIt'),
            'view': require('text!module/view/ScanIt.html')
        }
    };

    exports = module.exports = {
        getView: function(url) {
            return routes[url];
        }
    };
});
