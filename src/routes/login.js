'use strict';

module.exports = function (done) {

    $.router.post('/api/login_user', async function (req, res, next) {
        res.apiSuccess({user: req.session.session, token: req.session.logout_token});
    });

    $.router.post('/api/login', async function (req, res, next) {

        if(!req.body.password){
            return next(new Error('missing password.'));
        }

        const user = await $.method('user.get').call(req.body);

        if(!user){
            return next(new Error('user not exist'));
        }
        if(!$.utils.validatePassword(req.body.password, user.password)){
            return next(new Error('password error'));
        }

        req.session.user = user;
        req.session.logout_token = $.utils.randomString(20);

        res.apiSuccess({token: req.session.logout_token, id: user._id});
    });

    $.router.get('/api/logout', async function (req, res, next) {
        delete req.session.user;
        delete req.session.logout_token;
        res.apiSuccess({});
    });

    $.router.post('/api/signup', async function (req, res, next) {
        const user = await $.method('user.add').call(req.body);
        if(user){
            // send mail
            $.sendMail(req.body.email, 'welcome to ...', `welcome, 注冊成功 554 DT:SPM 发送的邮件内容包含了未被许可的信息，或被系统识别为垃圾邮件。请检查是否有用户发送病毒或者垃圾邮件 554 DT:SPM 发送的邮件内容包含了未被许可的信息，或被系统识别为垃圾邮件。请检查是否有用户发送病毒或者垃圾邮件 `, (result)=>{
                console.log(result);
                if(result.success){
                    // console.log('send success');
                }
            })
        }
        res.apiSuccess({user: user});
    });

    done();
};
