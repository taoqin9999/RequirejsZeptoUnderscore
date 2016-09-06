define(function(require, exports, module) {
    'use strict';

    var application = require('./application');

    var List = require('components/list/list');
    var Scroll = require('components/scroll/scroll');
    var Waterfall = require('components/waterfall/waterfall');

    var controllers = [];

    exports = module.exports = {
        home: function() {
            var len = controllers.length;

            for (var i = 0; i < len - 1; i++) {
                this.back();
            }
        },
        back: function() {
            if (controllers.length > 1) {
                //去掉队列最后一个controller
                var currentController = controllers.pop();

                //调用模板销毁方法
                currentController.destroy();

                //显示back后的页面
                currentController = controllers[controllers.length - 1];
                currentController.showView();
            }
        },
        _setState: function(req) {
            var retDfd = $.Deferred();

            var View = application.getView(req.viewId);

            var currentController = new View.controller(req.data);

            //页面控件处理
            var viewStr = View.view;

            var self = this;
            //获取模板初始化数据
            currentController.loadData().done(function(params) {
                _.extend(req.data, params);

                var compiled = _.template(viewStr);
                var _view = compiled(req.data);
                currentController._viewId = '#' + req.viewId;
                currentController.isChild = req.isChild;

                if (req.isPush) {
                    req.$el.append(_view);
                } else {
                    req.$el.html(_view);
                }

                var $view = req.$el.find(currentController._viewId);
                self._processControls(currentController, $view);

                currentController.initView();

                if (!req.isChild) {
                    controllers.push(currentController);
                }

                retDfd.resolve(currentController);
            }).fail(retDfd.reject);

            return retDfd;
        },
        _processControls: function(currentController, $view) {

            var scroll = new Scroll(currentController, $view);
            scroll.init(currentController, $view);

            var list = new List(currentController, $view);
            list.init(currentController, $view);

            var waterfall = new Waterfall(currentController, $view);
            waterfall.init(currentController, $view);
        },
        pushChildView: function(parentViewController, viewId, data) {
            return this._setState({
                viewId: viewId,
                data: data,
                $el: data.$el,
                isChild: true,
                isPush: true
            }).done(function(controller) {
                parentViewController.addChildViewController(viewId, controller);
            });
        },
        pushState: function(viewId, data) {
            //隐藏上一个页面
            var currentController = controllers[controllers.length - 1];
            if (currentController) {
                currentController.hideView();
            }

            return this._setState({
                viewId: viewId,
                data: data,
                $el: appView,
                isPush: true
            }).done(function() {
                history.pushState(data, null, '#' + viewId);
            });
        },
        replaceState: function(viewId, data) {
            //隐藏上一个页面
            var currentController = controllers[controllers.length - 1];
            if (currentController) {
                currentController.hideView();
            }

            return this._setState({
                viewId: viewId,
                data: data,
                $el: appView,
                isPush: false
            }).done(function() {
                history.replaceState(data, null, '#' + viewId);
            });
        }
    };
});
