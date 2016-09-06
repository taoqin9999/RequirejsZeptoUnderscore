/**
 * 易网新闻接口入口
 *
 * @class netEase
 * @singleton
 */
var netEase = (function(core) {
    'use strict';

    return {};
}(netEase));

/**
 * RecommendList
 *
 * 推荐内容
 *
 * @class netEase.data.RecommendList
 */
/**
 * Content ID
 * @property contentId
 * @type {String}
 */
/**
 * Content froeign key.
 * @property foreignsn
 * @type {String}
 */
/**
 * Content code allocated by a third-party system
 * @property externalCode
 * @type {String}
 */

/**
 * Configurations for netEase library.
 *
 * @class netEase.config
 * @singleton
 */
var netEase = (function(core) {
    'use strict';

    core.config = {
        /**
         * Ajax request timeout length
         * @property ajaxTimeout
         * @type {Number}
         */
        ajaxTimeout: 5000,
        /**
         * Should netEase Core support CORS
         * @property supportCors
         * @type {Boolean}
         */
        supportCors: false,

        /**
         * ajaxAsync
         * @type {Boolean}
         */
        ajaxAsync: false,

        /**
         * 获取推荐内容url
         * @type {String}
         */
        recommendDataUrl: 'http://j.news.163.com/hy/demorec.s',

        /**
         * 获取新闻内容url
         * @type {String}
         */
        newshotDataUrl: 'http://j.news.163.com/hy/newshot.s'
    };

    return core;
}(netEase));

/**
 * @class netEase
 */
var netEase = (function(core) {
    'use strict';

    /**
     * Level of log to print.
     *
     *     netEase.logLevel = 'error';
     *
     * Could be:
     *
     * - debug
     * - log
     * - error
     *
     * @property logLevel
     * @type {String}
     */
    core.logLevel = 'log';

    /**
     * Print debug info.
     *
     *     netEase.debug('This is debug message.');
     *
     * @param {String} info debug info
     */
    core.debug = function() {
        if (core.logLevel === 'debug') {
            var args = Array.prototype.slice.call(arguments);

            args.unshift('netEase[debug]:');

            console.debug.apply(console, args);
        }
    };

    /**
     * Print log info.
     *
     *     netEase.log('This is log message.');
     *
     * @param {String} info log info
     */
    core.log = function() {
        if (core.logLevel === 'debug' || core.logLevel === 'log') {
            var args = Array.prototype.slice.call(arguments);
            var now = new Date();

            args.unshift('netEase[log][' + now.toLocaleTimeString() + ' ' + now.getMilliseconds() + ']:');

            console.log.apply(console, args);
        }
    };

    /**
     * Print error info.
     *
     *     netEase.error('This is error message.');
     *
     * @param {String} info error info
     */
    core.error = function() {
        if (core.logLevel === 'debug' || core.logLevel === 'log' || core.logLevel === 'error') {
            var args = Array.prototype.slice.call(arguments);

            args.unshift('netEase[error]:');

            console.error.apply(console, args);
        }
    };

    return core;
}(netEase));

/**
 * @class netEase
 */
var netEase = (function(core) {
    'use strict';

    var utils = core.utils = core.utils || {};

    /**
     * Ajax request to backend
     * @private
     */
    utils.ajax = function(req) {
        req.type = req.type || 'GET';
        req.dataType = req.dataType || 'jsonp';
        req.async = core.config.ajaxAsync;
        req.jsonp = 'callback';

        if (req.type === 'GET' && req.data) {
            req.url += '?' + _.map(req.data, function(val, name) {
                return name + '=' + val;
            }).join('&');
        }

        return $.ajax(req);
    };

    return core;
}(netEase));

/**
 * @class netEase
 */
var netEase = (function(core) {
    'use strict';

    var eventSplitter = /\s+/;

    var Events = core.Events = function() {};

    var keys = Object.keys;

    if (!keys) {
        keys = function(obj) {
            var result = [];

            for (var name in obj) {
                if (obj.hasOwnProperty(name)) {
                    result.push(name);
                }
            }
            return result;
        }
    }

    /**
     * execute the callback method
     * @private
     * @param  {[type]} list     [description]
     * @param  {[type]} args     [description]
     * @param  {[type]} context  [description]
     * @param  {[type]} returned [description]
     * @return {[type]}          [description]
     */
    function callEach(list, args, context, returned) {
        var result;
        if (list) {
            for (var i = 0, len = list.length; i < len; i += 2) {
                result = list[i].apply(list[i + 1] || context, args);
                result === false && returned.status && (returned.status = false);
            }
        }
    }

    /**
     * [on description]
     * @private

     * @param  {[type]}   events   [description]
     * @param  {Function} callback [description]
     * @param  {[type]}   context  [description]
     * @return {[type]}            [description]
     */
    Events.on = function(events, callback, context) {
        var e, list, cache;
        if (!callback) {
            return this;
        }
        events = events.split(eventSplitter);
        cache = this.__events || (this.__events = {});

        while (e = events.shift()) {
            list = cache[e] || (cache[e] = []);
            list.push(callback, context);
        }
        return this;
    }

    /**
     * Remove callbacks.If 'context' is null, removes all callbacks
     * with that function. If 'callback' is null, removes all callbacks for the
     * event. If 'events' is null, removes all bound callbacks for all events.
     *
     * @param  {[type]}   events   [description]
     * @param  {Function} callback [description]
     * @param  {[type]}   context  [description]
     * @return {[type]}            [description]
     */
    Events.off = function(events, callback, context) {
        var e, list;
        var cache = this.__events;
        if (!cache) {
            return this;
        }

        if (!(events || callback || context)) {
            delete this.__events;
            return this;
        }

        events = events ? events.split(eventSplitter) : keys(cache);

        while (e = events.shift()) {
            list = cache[e];
            if (!list) {
                continue;
            }

            if (!(callback || context)) {
                delete cache[e];
                continue;
            }

            for (var i = list.length - 2; i >= 0; i -= 2) {
                if (!(callback && list[i] !== callback || context && list[i + 1] !== context)) {
                    list.splice(i, 2);
                }
            }
        }
        return this;
    }

    /**
     * [trigger description]
     * @private
     *
     * @param  {[type]} events [description]
     * @return {[type]}        [description]
     */
    Events.trigger = function(events) {
        var e, all, list, len, rest = [],
            args;
        var cache = this.__events;
        var returned = {
            status: true
        };

        if (!cache) {
            return this;
        }

        events = events.split(eventSplitter);

        for (var i = 1, len = arguments.length; i < len; i++) {
            rest[i - 1] = arguments[i];
        }

        while (e = events.shift()) {
            if (all = cache.all) {
                all = all.slice();
            }

            if (list = cache[e]) {
                list = list.slice();
            }

            // execute the callback method
            callEach(list, rest, this, returned);

            // execute the callback methods all
            callEach(all, [e].concat(rest), this, returned);
        }

        return returned.status;
    }

    return core;
}(netEase));

/**
 * @class netEase.eventManager
 */
var netEase = (function(core) {
    'use strict';

    /**
     * Events Object
     * @property {Object} Events
     */
    var Events = core.Events;

    var EventManager = function() {

        /**
         * Event Class Object
         * @property {Object} Event Object
         * @private
         */
        this._EventsObj = Events;
    };

    /**
     * add callback function to dest Object
     * @method on
     * @param {String} event
     * @param {Object} callback
     * @param {Object} context: optional
     * @returns {Object}
     */
    EventManager.prototype.on = function(event, callback, context) {
        event = event;
        context = context;
        if (typeof callback === 'undefined' || callback === null) {
            return this;
        }

        this._EventsObj.on.apply(this, arguments);
        return this;
    };

    /**
     * add callback function to dest Object
     * @param {String} event: optional.
     * @param {Object} callback: optional.
     * @param {Object} context: optional.
     * @returns {Object}
     */
    EventManager.prototype.off = function() {
        this._EventsObj.off.apply(this, arguments);
        return this;
    };

    /**
     * trigger  callback function
     * @method trigger
     * @param {String} event: optional
     * @param {Object} arg:
     * @returns {Object}
     */
    EventManager.prototype.trigger = function() {
        this._EventsObj.trigger.apply(this, arguments);
    };

    core.EventManager = new EventManager();
    return core;
}(netEase));

/**
 * 推荐接口
 *
 * @class netEase.newshotApp
 */
var netEase = (function(core) {
    'use strict';

    var newshotApp = core.newshotApp = core.newshotApp || {};

    var getNewshotList = function(req) {
        return core.utils.ajax({
            url: core.config.newshotDataUrl,
            data: req
        }).done(function(resp) {
            core.log(resp);
        }).fail(function(resp) {
            core.error(resp);
        });
    };

    /**
     * 获取娱乐列表
     * @param {Object} req
     * @param {number} req.offset offset
     * @param {number} req.limit limit
     * @return {netEase.data.RecommendList}
     */
    newshotApp.getEntertainmentList = function(req) {
        req.channel = 2;

        return getNewshotList(req);
    };

    /**
     * 获取体育列表
     * @param {Object} req
     * @param {number} req.offset offset
     * @param {number} req.limit limit
     * @return {netEase.data.RecommendList}
     */
    newshotApp.getSportsList = function(req) {
        req.channel = 3;

        return getNewshotList(req);
    };


    return core;
}(netEase));

/**
 * 推荐接口
 *
 * @class netEase.recommendApp
 */
var netEase = (function(core) {
    'use strict';

    var recommendApp = core.recommendApp = core.recommendApp || {};

    /**
     * 获取推荐列表
     * @param {Object} req
     * @param {number} req.offset offset
     * @param {number} req.limit limit
     * @return {netEase.data.RecommendList}
     */
    recommendApp.getRecommendList = function(req) {

        return core.utils.ajax({
            url: core.config.recommendDataUrl,
            data: req
        }).done(function(resp) {
            core.log(resp);
        }).fail(function(resp) {
            core.error(resp);
        });
    };

    return core;
}(netEase));
