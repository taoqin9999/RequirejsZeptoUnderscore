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
        },
        /**
         * 设置模板初始化需要的数据，如果未设置，就使用url的参数（?name=**&age=**）
         * @return {[type]} [description]
         */
        loadData: function() {
            return $.Deferred().resolve();
        },
        /**
         * 页面隐藏时调用
         * @return {[type]} [description]
         */
        hideView: function() {
            this.viewDidHide();
            console.log('Base..........hideView...');
        },

        /**
         * 页面div加载到主dom节点后调用
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        showView: function() {
            this.viewDidShow();
            console.log('Base..........showView...');
        },
        /**
         * 页面销毁时被调用
         * @return {[type]} [description]
         */
        destroy: function() {
            console.log('Base..........destroy...');
            this.viewDidDestroy();

            for (var p in this) {
                if (this.hasOwnProperty(p)) {
                    delete this[p];
                }
            }

            this.destroy = function() {};
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
        }
    };
    Base.extend = extend;

    exports = module.exports = Base;
});
