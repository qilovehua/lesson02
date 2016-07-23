'use strict';


module.exports = function (done) {

    $.router.get('/api/user', async function (req, res, next) {
        const user = await $.method('user.get').call(req.query);
        res.apiSuccess({user});
    });

    done();
};
