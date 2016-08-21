'use strict';

import './base';




// 初始化
$.init((err) => {
    if (err) {
        console.error(err);
        process.exit(-1);
    } else {
        console.log('inited [env=%s]', $.env);
        console.log($.config.get('db.mongodb'));
    }
    //
    // const item = new $.model.User({
    //     name: 'lin',
    //     password: '123456',
    //     nickname: 'qiqi'
    // });
    // item.save(console.log);

});