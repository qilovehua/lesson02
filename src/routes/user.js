'use strict';


module.exports = function (done) {

    $.router.get('/api/user', async function (req, res, next) {
	console.log('=====', req.query);
        const user = await $.method('user.get').call(req.query);
        res.apiSuccess({user});
    });

    $.router.post('/api/user', async function (req, res, next) {
        await $.method('user.update').call(req.body);
        const user = await $.method('user.get').call({_id: req.body._id});
        req.session.user = user;
        res.apiSuccess({user});
    });

    done();
};
