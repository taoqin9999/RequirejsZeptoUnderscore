define(function(require, exports, module) {
    'use strict';

    var List = function() {};
    List.prototype = {
        init: function(controller, $view) {
            var $lists = $view.find('div[data-role="List"]');
            _.each($lists, function(list) {
                var $list = $(list);
                var listId = $list.attr('id');
                var len = controller.numberOfItems(listId);

                var itemHtmls = '';
                for (var i = 0; i < len; i++) {
                    itemHtmls += controller.willDisplayItem(listId, i);
                }

                $list.find('.container').html(itemHtmls);

                var listType = $list.attr('data-type');

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
            });
        }
    };

    exports = module.exports = List;
});
