define(function(require, exports, module) {
    'use strict';

    var BClass = require('core/base');

    var menuList = require('module/data/MenuList.js');

    var currentFocus;

    var Clas = BClass.extend({
        initialize: function(options) {
            console.log('test..........initialize..options:' + options);
        },
        loadData: function() {
            return $.Deferred().resolve();
        },
        _getCurrentChildView: function(viewName) {
            var dfd = $.Deferred();

            if (this.viewControllers && this.viewControllers[viewName]) {
                dfd.resolve(this.viewControllers[viewName]);
            } else {
                gWindowManager.pushChildView(this, viewName, {
                    $el: this._view.find(".home_content")
                }).done(function() {
                    dfd.resolve();
                }).fail(dfd.reject);
            }

            return dfd;
        },
        viewDidHide: function() {
            console.log('test..........viewDidHide...');
        },
        viewDidShow: function() {
            console.log('test..........viewDidShow...');
        },
        viewDidInit: function() {
            console.log('test..........viewDidInit...');

            var self = this;
            this._view.find('.home_tabbar_item').click(function() {
                if (currentFocus) {
                    var id = currentFocus.attr('data-id');
                    var data = _.find(menuList, function(val) {
                        return val.id === id;
                    });

                    currentFocus.removeClass('focus');
                    currentFocus.find('.home_tabbar_icon').attr('src', data.imgSrc);
                    self.viewControllers[data.viewName].hideView();
                }

                currentFocus = $(this);
                var id = currentFocus.attr('data-id');
                var data = _.find(menuList, function(val) {
                    return val.id === id;
                });

                currentFocus.addClass('focus');
                currentFocus.find('.home_tabbar_icon').attr('src', data.imgFocusSrc);
                self._getCurrentChildView(data.viewName).done(function(viewcontroller) {
                    if (viewcontroller) {
                        viewcontroller.showView();
                    }
                });
            });

            this._view.find('.home_tabbar_lock').click(function() {
                alert('lock');
            });

            //初始化
            $(this._view.find('.home_tabbar_item')[0]).click();
        },
        viewDidDestroy: function() {
            console.log('test..........viewDidDestroy...');
        }
    });

    exports = module.exports = Clas;
});
