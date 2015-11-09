/**
 * Created by davidhoverson on 11/6/15.
 */
module.exports = function(app, passport) {

    app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/dashboard',
            failureRedirect: '/admin'
        }),
        function (req, res) {
            console.log("hello");

            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/admin',
        failureRedirect: '/'
    }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.resdirect('/');
    });
};

