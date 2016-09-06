define(function(require, exports, module) {
    'use strict';

    var BClass = require('core/base');

    var Clas = BClass.extend({
        initialize: function(options) {
            console.log('scanIt..........initialize..options:' + options);
        },
        loadData: function() {
            return $.Deferred().resolve();
        },
        viewDidHide: function() {
            console.log('scanIt..........viewDidHide...');
        },
        viewDidShow: function() {
            console.log('test..........viewDidShow...');
        },
        viewDidInit: function() {
            console.log('test..........viewDidInit...');
            this._view.click(function() {
                gWindowManager.back();
            });

            this._view.find('.baidu').click(function(event) {
                alert('1111111111111111');
                event.stopPropagation();
            });
        },
        viewDidDestroy: function() {
            console.log('scanIt..........viewDidDestroy...');
        }
    });

    exports = module.exports = Clas;
});
