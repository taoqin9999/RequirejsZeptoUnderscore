define(function(require, exports, module) {
    'use strict';

    var Scroll = function() {};
    Scroll.prototype = {
        init: function(controller, $view) {
            var listRole = $view.attr('data-role');
            if (listRole === 'Scroll') {
                var listId = $view.attr('id');

                var listType = $view.attr('data-type');

                if (listType === 'X') {
                    new IScroll('#' + listId, {
                        mouseWheel: true,
                        scrollbars: true,
                        fadeScrollbars: true,
                        scrollX: true,
                        scrollY: false
                    });
                } else if (listType === 'Y') {
                    new IScroll('#' + listId, {
                        mouseWheel: true,
                        scrollbars: true,
                        fadeScrollbars: true,
                        scrollX: false,
                        scrollY: true
                    });
                }
            }
        }
    };

    exports = module.exports = Scroll;
});
