module.exports = function(grunt) {
    'use strict';

    var config = {
        'build': 'build',
        "src": [
            "webapp/core/**/*.js",
            "webapp/module/**/*.js"
        ],
        "dest": "build/dist/all.js",
        "min": "build/dist/all.main.js",
        "less": "build/less.css",
        "css": "build/all.css"
    };

    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
    });

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,
        clean: {
            'options': {
                'force': true
            },
            'dist': ['<%= config.build %>/*']
        },
        copy: {
            'dist': {
                'files': [{
                    'expand': true,
                    'dot': true,
                    'cwd': 'webapp',
                    'dest': 'build',
                    'src': [
                        '**/*.{ico,png,txt,html,js,jpg,gif,json}'
                    ]
                }]
            },
            'debug': {
                'files': [{
                    'src': 'build/index_debug.html',
                    'dest': 'build/index.html'
                }]
            }
        },
        concat: {
            css: {
                src: [
                    "webapp/libs/weui.css",
                    "webapp/module/css/**/*.css",
                    "webapp/core/components/**/*.css"
                ],
                dest: '<%= config.less %>'
            }
        },
        less: {
            // 开发环境
            development: {
                options: {
                    paths: ["."] // @import 加载文件的路径
                },
                files: {
                    "<%= config.css %>": "<%= config.less %>" // 将path/to/source.less编译为path/to/result.css
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%=config.min%>': '<%= config.dest %>'
                }
            }
        },
        jshint: {
            files: ["webapp/core/**/*.js",
                "webapp/module/**/*.js"
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: 'jslint',
                reporterOutput: 'build/report/jshint.xml'
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        jsduck: {
            main: {
                src: ['<%= config.src %>'],
                dest: 'build/dist/docs',
                options: {
                    'title': 'netEase',
                    'no-source': true,
                    'builtin-classes': true
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: './',
                    "paths": {
                        "core": "<%= config.dest %>"
                    },
                    "include": [
                        "core"
                    ],
                    out: '<%= config.build %>/optimized.js'
                }
            }
        }
    });


    grunt.registerTask('doc', ['jsduck']);
    grunt.registerTask('default', ['clean', 'concat', 'requirejs']);
    grunt.registerTask('test', ['clean', 'copy', 'concat', 'less']);
};
