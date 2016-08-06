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

    win.appView = $('#container'); //用于各个模块控制视图变化
    win.topView = $('#containerTop'); //TOP
    win.bottomView = $('#containerBottom'); //BOTTOM

    require(['core/WindowManager'], function(WindowManager) {
        win.gWindowManager = WindowManager;

        WindowManager.init(); //开始监控url变化

        WindowManager._setState('#home', {
            title: 'ssssssssssssss'
        });
        //WindowManager.setBottom('#bottom');
    });


})(window);
