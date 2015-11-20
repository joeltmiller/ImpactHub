/**
 * Created by davidhoverson on 11/6/15.
 */
var path = require('path');
module.exports = function(app, passport) {

    app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/dashboard',
            failureRedirect: '/admin',
            failureFlash: true
        }));

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/admin',
        failureRedirect: '/'
    }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/dashboard', isLoggedIn, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/views/dashboard.html"));
    });

    app.get('/email', isLoggedIn, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/views/email.html"));
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

