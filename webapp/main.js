(function(win) {

    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };

    var config = {
        baseUrl: '.',
        paths: {
            components: 'core/components',
            text: 'libs/text' //用于requirejs导入html类型的依赖
        }
    };

    require.config(config);

    win.appView = $('.container'); //用于各个模块控制视图变化

    require(['core/WindowManager'], function(WindowManager) {
        win.gWindowManager = WindowManager;

        WindowManager.pushState('home');

    });
})(window);
