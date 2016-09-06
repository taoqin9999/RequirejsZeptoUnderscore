define(function(require, exports, module) {
    'use strict';

    var Waterfall = function() {};
    Waterfall.prototype = {
        init: function(controller, $view) {
            var $list = $view.find('div[data-role="Waterfall"]');

            if (!$list || $list.length === 0) {
                return;
            }

            var listId = $list.attr('id');

            var offset = 0;
            var itemHtmls = '';
            var count = controller.numberPerPage(listId);

            this.initScoll(listId, $view);

            //初始化执行一次
            controller.queryFunction(listId, offset, count).done(function(resp) {


                $list.find('.container > .thelist').html(itemHtmls);
            });
        },
        initScoll: function(listId, $view) {
            var pullDownEl = $view.find('#pullDown');
            var pullDownOffset = pullDownEl.offsetHeight;
            var pullUpEl = $view.find('#pullUp');
            var pullUpOffset = pullUpEl.offsetHeight;

            var myScroll = new IScroll('#' + listId, {
                useTransition: true,
                topOffset: pullDownOffset,
                onRefresh: function() {
                    if (pullDownEl.hasClass('loading')) {
                        pullDownEl.removeClass();
                        pullDownEl.find('.pullDownLabel').text('Pull down to refresh...');
                        console.log('下拉刷新完成后，提示信息更新');
                    } else if (pullUpEl.hasClass('loading')) {
                        pullUpEl.removeClass();
                        pullUpEl.find('.pullUpLabel').text('Pull up to load more...');
                        console.log('上拉刷新完成后，提示信息更新');
                    }
                },
                onScrollMove: function() {
                    console.log('this.y:' + this.y + ',flip:' + pullDownElhasClass('flip') + ',this.maxScrollY:' + this.maxScrollY);
                    if (this.y > 5 && !pullDownEl.hasClass('flip')) {
                        pullDownEl.removeClass().addClass('flip');
                        pullDownEl.find('.pullDownLabel').text('Release to refresh...');
                        console.log('下拉超过指定大小，松开刷新');
                        this.minScrollY = 0;
                    } else if (this.y < 5 && pullDownEl.hasClass('flip')) {
                        pullDownEl.removeClass();
                        pullDownEl.find('.pullDownLabel').text('Pull down to refresh...');
                        console.log('下拉后，回退，松开不会刷新');
                        this.minScrollY = -pullDownOffset;
                    } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.hasClass('flip')) {
                        pullUpEl.removeClass().addClass('flip');
                        pullUpEl.find('.pullUpLabel').text('Release to refresh...');
                        console.log('上啦超过指定大小，松开刷新');
                        this.maxScrollY = this.maxScrollY;
                    } else if (this.y > (this.maxScrollY + 5) && pullUpEl.hasClass('flip')) {
                        pullUpEl.removeClass();
                        pullUpEl.find('.pullUpLabel').text('Pull up to load more...');
                        console.log('上啦后，回退，松开不会刷新');
                        this.maxScrollY = pullUpOffset;
                    }
                },
                onScrollEnd: function() {
                    if (pullDownEl.hasClass('flip')) {
                        pullDownEl.removeClass().addClass('loading');
                        pullDownEl.find('.pullDownLabel').text('Loading...');
                        console.log('下拉松开刷新');
                        //pullDownAction(); // Execute custom function (ajax call?)
                    } else if (pullUpEl.hasClass('flip')) {
                        pullUpEl.removeClass().addClass('loading');
                        pullUpEl.find('.pullUpLabel').text('Loading...');
                        console.log('上啦松开刷新');
                        //pullUpAction(); // Execute custom function (ajax call?)
                    }
                }
            });

        }
    };

    exports = module.exports = Waterfall;
});
