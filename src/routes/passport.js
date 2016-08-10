'use strict';

import passport from 'passport';
import {Strategy as GitHubStrategy} from 'passport-github';

module.exports = function (done) {


    passport.use(new GitHubStrategy({
        clientID: 'f30d515a174f1bc329c8',
        clientSecret: '3ebdd41750fb20b603243a94fb2bbeeb2ad68a8a',
        callbackURL: '127.0.0.1:8000/api/succ/auth/github'}, function (accessToken, refreshToken, profile, callback) {

        $.method('user.get').call({githubUsername: profile.username}, (err, user) => {
            callback(err, {
                info: user,
                github: profile,
            });
        });

    }));

    $.router.get('/api/auth/github', passport.authenticate('github'));

    $.router.get('/api/succ/auth/github', function (req, res) {
	
	console.log(req.info, req.github);
        if (req.info) {
            // 用户存在
            req.session.user = req.user.info;
            req.session.logout_token = $.utils.randomString(20);
            res.apiSuccess({token: req.session.logout_token, id: user._id});
        } else {
            // 用户不存在
            req.session.github_user = req.github;
            res.apiSuccess({github: true});
        }
    });

    done();

};
