define(function(require, exports, module) {
    'use strict';

    var BClass = require('core/base');

    var Clas = BClass.extend({
        initialize: function(options) {
            console.log('test..........initialize..options:' + options);

            this.testList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'L'];
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
        viewDidDestroy: function() {
            console.log('test..........viewDidDestroy...');
        },
        willDisplayItem: function(listId, index) {
            var itemData = {};

            if (listId === 'test_list') {
                itemData.value = this.testList[index];
            }

            return itemData;
        },
        numberOfItems: function(listId) {
            if (listId === 'test_list') {
                return this.testList.length;
            }
        }
    });

    exports = module.exports = Clas;
});
