define(function(require, exports, module) {
    'use strict';

    var BClass = require('core/base');

    var Clas = BClass.extend({
        initialize: function(options) {
            console.log('bottom..........initialize..options:' + options);
        },
        loadData: function() {
            return $.Deferred().resolve();
        },
        viewDidHide: function() {
            console.log('bottom..........viewDidHide...');
        },
        viewDidShow: function() {
            console.log('bottom..........viewDidShow...');
        },
        viewDidDestroy: function() {
            console.log('bottom..........viewDidDestroy...');
        }
    });

    exports = module.exports = Clas;
});
