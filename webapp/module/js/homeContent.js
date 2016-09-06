define(function(require, exports, module) {
    'use strict';

    var BClass = require('core/base');

    var quickEntryList = require('module/data/QuickEntryList.js');
    var recommendedFruitsList = require('module/data/RecommendedFruitsList.js');
    var recommendedFruitsList2 = require('module/data/RecommendedFruitsList2.js');

    var quickEntryView = require('text!module/view/homeContent.quickEntryList.html');
    var recommendedFruitsView = require('text!module/view/homeContent.recommendedFruitsList.html');

    var Clas = BClass.extend({
        initialize: function(options) {
            //init data
        },
        loadData: function() {
            return $.Deferred().resolve();
        },
        listNotificationInterests: function() {
            return ['TEST'];
        },

        /**
         * interest event callback
         */
        handleNotification: function(notification) {
            switch (notification.eventName) {
                case 'TEST':
                    console.log('Test Event....');
                    break;
            }
        },
        viewDidHide: function() {
            console.log('test..........viewDidHide...');
        },
        viewDidShow: function() {
            console.log('test..........viewDidShow...');
        },
        viewDidInit: function() {
            console.log('test..........viewDidInit...');

            // this._view.find(".dongchengFamily").click(function() {
            //     alert('东城世家');
            // });

            // this._view.find(".UHomeStation").click(function() {
            //     alert('U家小站');
            // });

            // this._view.find(".scanIt").click(function() {
            //     gWindowManager.pushState('scanIt');
            // });

            // this._view.find(".bannerImg").click(function() {
            //     alert('不想中招');
            // });

            // this._view.find(".quickEntry").click(function() {
            //     alert($(this).attr('value'));
            // });

            // this._view.find(".banner2Img").click(function() {
            //     alert('活动不断');
            // });

            // this._view.find(".recommendedFruits").click(function() {
            //     alert($(this).attr('value'));
            // });

            // this._view.find(".spike").click(function() {
            //     alert('限时抢购');
            // });

            // this._view.find(".weekPackages").click(function() {
            //     alert('本周套餐');
            // });

            // this._view.find(".summer").click(function() {
            //     alert('夏');
            // });

            // this._view.find(".aprilFoolsDay").click(function() {
            //     alert('疯狂4.1');
            // });

            // var myScroll = new IScroll('#homeContent', {
            //     mouseWheel: true,
            //     scrollbars: true,
            //     fadeScrollbars: true
            // });
        },
        viewDidDestroy: function() {
            console.log('test..........viewDidDestroy...');
        },
        getItemView: function(listId) {
            if (listId === 'quickEntryList') {
                return quickEntryView;
            } else if (listId === 'recommendedFruitsList') {
                return recommendedFruitsView;
            } else if (listId === 'recommendedFruitsList2') {
                return recommendedFruitsView;
            }
        },
        willDisplayItem: function(listId, index) {
            var itemData = {};
            var compiled;

            if (listId === 'quickEntryList') {
                itemData = quickEntryList[index];

                compiled = _.template(quickEntryView);

            } else if (listId === 'recommendedFruitsList') {
                itemData = recommendedFruitsList[index];

                compiled = _.template(recommendedFruitsView);
            } else if (listId === 'recommendedFruitsList2') {
                itemData = recommendedFruitsList2[index];

                compiled = _.template(recommendedFruitsView);
            }

            return compiled(itemData);
        },
        numberOfItems: function(listId) {
            if (listId === 'quickEntryList') {
                return quickEntryList.length;
            } else if (listId === 'recommendedFruitsList') {
                return recommendedFruitsList.length;
            } else if (listId === 'recommendedFruitsList2') {
                return recommendedFruitsList2.length;
            }
        }
    });

    exports = module.exports = Clas;
});
