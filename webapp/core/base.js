define(function(require, exports, module) {
    'use strict';

    function extend(funcs) {
        var subClass = function(options) {
            console.log('subClass.............');
            this.initialize(options);
        };

        _.extend(subClass.prototype, this.prototype);
        _.extend(subClass.prototype, funcs);
        subClass.superclass = this.prototype;
        subClass.extend = extend;
        return subClass;
    }

    var Base = function() {};
    Base.prototype = {
        /**
         * 数据初始化时调用
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        initialize: function(options) {
            console.log('Base..........initialize..options:' + options);
            this.viewControllers = null;
        },
        /**
         * 设置模板初始化需要的数据
         * @return {[type]} [description]
         */
        loadData: function() {
            return $.Deferred().resolve();
        },
        /**
         * 页面监听事件列表
         * @return {[type]} [description]
         */
        listNotificationInterests: function() {
            return [];
        },

        /**
         * 页面事件处理
         * @param  {[type]} notification [description]
         * @return {[type]}              [description]
         */
        handleNotification: function(notification) {

        },
        /**
         * 初始化
         * @return {[type]} [description]
         */
        initView: function() {
            this._view = $(this._viewId);

            //开始监听事件

            //页面事件处理
            var self = this;
            var eventNames = this.listNotificationInterests ? this.listNotificationInterests() : [];

            if (eventNames.length) {
                _.each(eventNames, function(eventName) {
                    netEase.EventManager.on(eventName, self.handleNotification, self);
                });
            }

            this.viewDidInit();
            this.viewDidShow();
        },
        /**
         * 页面隐藏时调用
         * @return {[type]} [description]
         */
        hideView: function() {
            if (this.isChild) {
                this._view.hide();
            }
            this.viewDidHide();
            console.log('Base..........hideView...');
        },

        /**
         * 页面div加载到主dom节点后调用
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        showView: function() {
            if (this.isChild) {
                this._view.show();
            }

            this.viewDidShow();
            console.log('Base..........showView...');
        },
        /**
         * 页面销毁时被调用
         * @return {[type]} [description]
         */
        destroy: function() {
            console.log('Base..........destroy...');

            //删除模板
            var self = this;
            this._view.addClass('slideOut').on('animationend', function() {
                self._view.remove();
                self._destroy();
            }).on('webkitAnimationEnd', function() {
                self._view.remove();
                self._destroy();
            });


        },
        _destroy: function() {
            //取消监听事件
            var self = this;
            var eventNames = this.listNotificationInterests ? this.listNotificationInterests() : [];
            _.each(eventNames, function(eventName) {
                netEase.EventManager.off(eventName, self.handleNotification, self);
            });

            //销毁子页面
            for (var p in this.viewControllers) {
                p.destroy();
            }

            this.viewDidDestroy();

            for (var p in this) {
                if (this.hasOwnProperty(p)) {
                    delete this[p];
                }
            }

            this.destroy = function() {};
        },
        /**
         * 页面初次加载完初始化
         * @return {[type]} [description]
         */
        viewDidInit: function() {
            console.log('Base..........viewDidInit...');
        },
        /**
         * 页面隐藏时调用，给页面覆盖使用，处理页面自己的逻辑
         * @return {[type]} [description]
         */
        viewDidHide: function() {
            console.log('Base..........viewDidHide...');
        },
        /**
         * 页面div加载到主dom节点后调用，给页面覆盖使用，处理页面自己的逻辑
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        viewDidShow: function() {
            console.log('Base..........viewDidShow...');
        },
        /**
         * 页面销毁时被调用，给页面覆盖使用，处理页面自己的逻辑
         * @return {[type]} [description]
         */
        viewDidDestroy: function() {
            console.log('Base..........viewDidDestroy...');
        },
        /**
         * 添加子页面
         * @param {[type]} viewId         [description]
         * @param {[type]} viewController [description]
         */
        addChildViewController: function(viewId, viewController) {
            if (!this.viewControllers) {
                this.viewControllers = {};
            }

            this.viewControllers[viewId] = viewController;
        }
    };

    Base.extend = extend;

    exports = module.exports = Base;
});
