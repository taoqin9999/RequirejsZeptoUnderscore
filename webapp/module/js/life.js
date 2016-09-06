define(function(require, exports, module) {
    'use strict';

    var BClass = require('core/base');
    var testList = require('module/data/TestList.js');

    var testView = require('text!module/view/life.testList.html');

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
        },
        queryFunction: function(listId, offset, count) {
            if (listId === 'testLife') {
                return $.Deferred().resolve(testList);
            }
        },
        numberPerPage: function(listId) {
            if (listId === 'testLife') {
                return 5;
            }
        },
        willDisplayItem: function(listId, index) {
            var itemData = {};
            var compiled;

            if (listId === 'testLife') {
                itemData = testList[index];

                compiled = _.template(testView);

            }

            return compiled(itemData);
        }
    });

    exports = module.exports = Clas;
});
