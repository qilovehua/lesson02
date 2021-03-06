'use strict';

var errMsg = 'something wrong happend: ';

function format(users) {
    var result = '';
    users.forEach(function (user, index) {
        result += '    '+ index + ' _id: ' + user._id + ', name: ' + user.name + ', nickname:' + user.nickname + '\n';
    });
    return result;
}

module.exports = function (done) {

    $.router.get('/', function (req, res, next) {
        res.end(`now is ${new Date()}`);
    });

    $.router.get('/user', function (req, res, next) {
        $.model.User.find(function (err, users) {
            if(err){
                res.end('query user error: ', err);
            }else {
                res.end('All of users are: \n' + format(users));
            }
        });
    });

    $.router.get('/user/add', function (req, res, next) {
        res.redirect('/user/add/0');
    });

    $.router.get('/user/add/:name', function (req, res, next) {
        var name = req.params.name;
        if(!name || name == '0'){
            name = 'lin'+new Date().getTime();
        }
        const item = new $.model.User({
            name: name,
            password: '123456',
            nickname: 'qiqi'
        });
        item.save();
        res.redirect('/user');
        // res.end('add user id: ' + item._id + ', name: ' + item.name);
    });
    
    $.router.get('/user/get/:name', function (req, res, next) {
        var name = req.params.name;
        $.model.User.findOne({name: new RegExp(name, 'i')}, function (err, user) {
            if(err){
                res.end(errMsg + err);
            }else {
                res.end('get user id: ' + user._id + ', name: ' + user.name);
            }
        });
    });

    $.router.get('/user/update/:name', function (req, res, next) {
        var name = req.params.name;
        if(!name){
            res.end('Error: url format /user/update/<name>');
        }
        $.model.User.findOne({name: new RegExp(name, 'i')}, function (err, user) {
            if(err){
                res.end(errMsg + err);
            }else {
                var newNick = user.nickname + new Date().getTime() + 'new';

                // 两种方法更新
                user.set({nickname: newNick});
                user.save();
                res.redirect('/user');
                // res.end('update sucess, new nickname: ' + newNick);

                // https://cnodejs.org/topic/50dde64ea7e6c6171a80a678
                // $.model.User.update({_id: user._id}, {
                //     $set: {nickname: newNick}
                // }, {new: true}, function (err) {
                //     if (err) {
                //         res.end(errMsg + err);
                //     }
                //     res.end('update sucess, new nickname: ' + newNick);
                // });
            }
        });
    });

    $.router.get('/user/delete/:name', function (req, res, next) {
        var name = req.params.name;
        if(!name){
            res.end('Error: url format /user/update/<name>');
        }
        $.model.User.findOne({name: new RegExp(name, 'i')}, function (err, user) {
            if(err){
                res.end('some wrong happend: ' + err + '\n do nothing');
            }else {
                $.model.User.remove({_id: user._id}, function (err) {
                    if(err){
                        res.end(errMsg + err);
                    }else{
                        res.redirect('/user');
                        // res.end('delete success, detail: ' + user.name);
                    }
                });
            }
        });
    });
    
    done();
};