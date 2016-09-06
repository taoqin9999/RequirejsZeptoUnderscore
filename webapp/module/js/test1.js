define(function(require, exports, module) {
    'use strict';

    var BClass = require('core/base');

    var Clas = BClass.extend({
        initialize: function(options) {
            console.log('test1..........initialize..options:' + options);
        },
        viewDidHide: function() {
            console.log('test1..........viewDidHide...');
        },
        viewDidShow: function() {
            console.log('test..........viewDidShow...');
        },
        viewDidInit: function() {
            console.log('test..........viewDidInit...');

        },
        viewDidDestroy: function() {
            console.log('test1..........viewDidDestroy...');
        }
    });

    exports = module.exports = Clas;
});
