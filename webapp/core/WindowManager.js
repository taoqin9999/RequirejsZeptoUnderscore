define(function(require, exports, module) {
    'use strict';

    var application = require('./application');
    var List = require('components/list/list');

    var currentController = null;
    var topController = null;
    var bottomController = null;

    var controllers = [];

    exports = module.exports = {
        init: function() {
            var self = this;

            window.onpopstate = function() {
                var state = history.state || {};
                var url = location.hash.indexOf('#') === 0 ? location.hash : '#home';

                var pageIndex = _.findIndex(controllers, function(controller) {
                    return controller._viewUrl === url;
                });

                if (pageIndex > -1) {
                    self.go(pageIndex + 1);
                } else {
                    var View = application.getView(url);

                    if (View) {
                        self._setState(url, state);
                    } else {
                        self.home();
                    }
                }
            };
        },
        _setState: function(viewUrl, data) {
            //隐藏上一个页面
            if (currentController) {
                currentController.hideView();
            }

            var View = application.getView(viewUrl);

            currentController = new View.controller(data);

            var viewStr = View.view;
            viewStr = this._processControls(currentController, viewStr);

            //获取模板初始化数据
            return currentController.loadData().done(function(params) {
                data = params || data;

                var compiled = _.template(viewStr);
                currentController._view = compiled(data);
                currentController._viewId = View.viewId;
                currentController._viewUrl = viewUrl;

                appView.append(currentController._view);

                currentController.showView();

                controllers.push(currentController);
            });
        },
        _processControls: function(currentController, viewStr) {
            var $view = $(viewStr);

            var List = new List(currentController, $view);
            List.initialize(currentController, $view);
            //this._processList(currentController, $view);


            return $view[0].outerHTML;
        },
        _processList: function(currentController, $view) {
            var $lists = $view.find('div[data-role="List"]');
            _.each($lists, function(list) {
                var $list = $(list);
                var listId = $list.attr('id');
                var templateStr = $list.html();
                var compiled = _.template(templateStr);

                var len = currentController.numberOfItems(listId);

                var itemHtmls = '';
                for (var i = 0; i < len; i++) {
                    var itemData = currentController.willDisplayItem(listId, i);
                    itemHtmls += compiled(itemData);
                }

                $list.html(itemHtmls);
            });
        },
        pushState: function(viewUrl, data) {
            return this._setState(viewUrl, data).done(function() {
                history.pushState(data, null, viewUrl);
            });
        },
        replaceState: function(viewUrl, data) {
            return this._setState(viewUrl, data).done(function() {
                history.replaceState(data, null, viewUrl);
            });
        },
        go: function(pageIndex) {
            var len = controllers.length;
            for (var i = len; i > pageIndex; i--) {
                currentController = controllers.pop();

                //删除模板
                $(currentController._viewId).remove();

                //调用模板销毁方法
                currentController.destroy();
            }
        },
        home: function() {
            if (history.length > 1) {
                history.go(2 - history.length);
            }
        },
        back: function() {
            history.back();
        },
        setTop: function(viewUrl) {
            //隐藏上一个页面
            if (topController) {
                topController.hideView();
                topController.destroy();
            }

            var View = application.getView(viewUrl);

            topController = new View.controller();

            //获取模板初始化数据
            return topController.loadData().done(function(params) {
                var data = params;

                var compiled = _.template(View.view);
                topController._view = compiled({});
                topController._viewId = View.viewId;
                topController._viewUrl = viewUrl;

                bottomView.html(topController._view);

                topController.showView();
            });
        },
        setBottom: function(viewUrl) {
            //隐藏上一个页面
            if (bottomController) {
                bottomController.hideView();
                bottomController.destroy();
            }

            var View = application.getView(viewUrl);

            bottomController = new View.controller();

            //获取模板初始化数据
            return bottomController.loadData().done(function(params) {
                var data = params;

                var compiled = _.template(View.view);
                bottomController._view = compiled({});
                bottomController._viewId = View.viewId;
                bottomController._viewUrl = viewUrl;

                bottomView.html(bottomController._view);

                bottomController.showView();
            });
        }
    };
});
