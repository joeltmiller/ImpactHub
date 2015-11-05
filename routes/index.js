var express = require('express');
var path = require('path');
var mysql = require('mysql');
var router = express.Router();

//Loading in the sql database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'impact_msp',
    password: 'test123',
    database: 'impact_schema'
});


/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

//Form Post
router.post('/guest', function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var meeting = req.body.meeting;
    var twitter = req.body.twitter;
    var member = req.body.member;
    var email_opt_in = req.body.email_opt_in;

    var post = {fullname: name, email: email, meeting_with: meeting,
    twitter: twitter, member: member, email_opt_in: email_opt_in
    };

    connection.query('INSERT INTO guest SET ?', post, function (err) {
        if (err) throw err;
        res.send(200);
    });

});

router.get('/data', function (req, res, next) {
    connection.query('SELECT * FROM guest', function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
});


module.exports = router;
