'use strict';

import path from 'path'
import ProjectCore from 'project-core'

const $ = new ProjectCore();

$.init.add((done)=>{
    $.config.load(path.resolve(__dirname, '../config', 'config.js'));
    const env = process.env.NODE_ENV || null;
    if(env){
        $.config.load(path.resolve(__dirname, '../config', env + '.js'));
    }

    $.env = env;
    done();
});

$.init((err)=>{
    if(err){
        console.error(err);
        process.exit(-1);
    }else{
        console.log('inited [env=%s]', $.env);
    }
});