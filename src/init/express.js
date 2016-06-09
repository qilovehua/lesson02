'use strict';

import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';
import bodyParse from 'body-parser';
import multiParty from 'multiparty';

module.exports = function (done) {

    const debug = $.createDebug('init:express');
    debug('initing express ... ');

    const app = express();

    app.use(bodyParse.json());
    app.use(bodyParse.urlencoded({extended: false}));

    const router = express.Router();
    $.router = router;

    app.use(router);
    app.use('/static', serveStatic(path.resolve(__dirname, '../../static')));

    app.listen($.config.get('web.port'), (err)=>{
        done(err);
    });

    done();

};