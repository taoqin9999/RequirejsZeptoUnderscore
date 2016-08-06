define(function(require, exports, module) {
    'use strict';

    var List = function() {};
    List.prototype = {
        initialize: function(options) {
            console.log('List..........initialize...');
        }
    };
    List.extend = extend;

    exports = module.exports = List;
});
