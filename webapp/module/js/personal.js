define(function(require, exports, module) {
    'use strict';

    var BClass = require('core/base');

    var Clas = BClass.extend({
        initialize: function(options) {
            console.log('test..........initialize..options:' + options);
        },
        loadData: function() {
            return $.Deferred().resolve();
        },
        viewDidHide: function() {
            console.log('test..........viewDidHide...');
        },
        viewDidShow: function() {
            console.log('test..........viewDidShow...');
        },
        viewDidInit: function() {
            console.log('test..........viewDidInit...');

        },
        viewDidDestroy: function() {
            console.log('test..........viewDidDestroy...');
        }
    });

    exports = module.exports = Clas;
});
