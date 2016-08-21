'use strict';

module.exports = function (set, get, has) {
    set('db.mongodb', 'mongodb://localhost:27017/nodejs_project');
    set('web.port', '8000');
    set('web.session.secret', 'test');
};