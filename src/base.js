'use strict';

require('babel-polyfill');

import path from 'path';
import ProjectCore from 'project-core';
import createDebug from 'debug';

const $ = global.$ = new ProjectCore();

// create debug func
$.createDebug = function (name) {
    return createDebug('my: ' + name);
};
const debug = $.createDebug('server');

function configLoad(dir, filename) {
    try {
        $.config.load(path.resolve(__dirname, dir, filename));
    } catch (err){
        throw new Error('Something wrong in file '+dir+'/'+filename+': ' + err);
    }
}

// 加载配置文件
$.init.add((done) => {
    $.config.load(path.resolve(__dirname, 'config', 'config.js'));
    const env = process.env.NODE_ENV || null;
    if (env) {
        env.split(',').forEach(env => {
            debug('load env: %s', env);
            // $.config.load(path.resolve(__dirname, 'config', env + '.js'));
            configLoad('config', env+'.js');
        });
    }
    $.env = env;
    done();
});

// 初始化MongoDB
$.init.load(path.resolve(__dirname, 'init', 'mongodb.js'));
// 加载Models
$.init.load(path.resolve(__dirname, 'models'));

// 加载methods
$.init.load(path.resolve(__dirname, 'methods'));

// init express
$.init.load(path.resolve(__dirname, 'init', 'express.js'));

// init middlewares
$.init.load(path.resolve(__dirname, 'middlewares'));

// init routes
$.init.load(path.resolve(__dirname, 'routes'));