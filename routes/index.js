var express = require('express');
var path = require('path');
var mysql = require('mysql');
var router = express.Router();

var moment = require('moment');
var request = require('request');
var env = require('dotenv');

env.load();

//Loading in the sql database
var connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.dbuser,
    password: process.env.dbpass,
    database: process.env.database
});


/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.get('/admin', function(req, res){
    res.render('admin.ejs', { message: req.flash('loginMessage') });
});


//Form Post
router.post('/guest', function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var member = "No, I'm a Guest";
    var meeting = req.body.meeting;
    var twitter = req.body.twitter;
    var company = req.body.company;
    var membership = req.body.membership;
    var email_me = req.body.email_opt_in;
    var event = req.body.event;
    var datetime = moment().format('YYYY-MM-DD HH:mm:ss');

    if(membership == true){
        membership = 1;
    }else{
        membership = 0;
    }

    if(email_me == true){
        email_me = 1;
    }else{
        email_me = 0;
    }
    if(event == true){
        event = 1;
    }else{
        email_me = 0;
    }

    var post = {name: name, email: email, meeting_with: meeting, member: member,
    twitter: twitter, membership: membership, company: company, email_me: email_me, event: event, temp_time: datetime};

    console.log(post);

    connection.query('INSERT INTO responses SET ?', post, function (err) {
        if (err) throw err;

        res.json({route: '/whoshere'}); //this is sent to client.js


    });

});

router.post('/member', function(req,res){
    var datetime = moment().format('YYYY-MM-DD HH:mm:ss');
    var name = req.body.name;
    var member = "Yes, I'm a Member";
    var email = req.body.email;
    var company = req.body.company;

    var post = {temp_time: datetime, name: name, member: member, email: email, company: company};

    connection.query('INSERT INTO responses SET ?', post, function (err) {
        if (err) throw err;
        res.sendStatus(200);
    });
});

router.get('/data', function (req, res, next) {
    connection.query('SELECT * FROM responses', function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/guestEmails', function (req, res, next) {
    connection.query("SELECT * FROM responses WHERE member like '%No%' AND email IS NOT NULL ORDER BY temp_time DESC", function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/perWeek', function(req, res) {
    connection.query('SELECT * FROM responses WHERE temp_time BETWEEN NOW()-INTERVAL 7 DAY AND NOW()', function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/guestsPerDay', function(req, res) {
    connection.query("SELECT * FROM responses WHERE temp_time > CURDATE() AND member LIKE '%No%';", function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/membersPerDay', function(req, res) {
    connection.query("SELECT * FROM responses WHERE temp_time > CURDATE() AND member LIKE '%Yes%'", function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/currentMonth', function(req, res) {
    connection.query('SELECT * FROM responses WHERE YEAR(temp_time) = YEAR(CURRENT_DATE) AND MONTH(temp_time) = MONTH(CURRENT_DATE)', function(err, rows) {
        if(err) throw err;
        res.json(rows);
    });
});

router.get('/priorMonth', function(req, res) {
    connection.query('SELECT * FROM responses WHERE YEAR(temp_time) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH) AND MONTH(temp_time) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH)', function(err, rows) {
        if(err) throw err;
        res.json(rows);
    });
});

router.get('/priorTwoMonth', function(req, res) {
    connection.query('SELECT * FROM responses WHERE YEAR(temp_time) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH) AND MONTH(temp_time) = MONTH(CURRENT_DATE - INTERVAL 2 MONTH)', function(err, rows) {
        if(err) throw err;
        res.json(rows);
    });
});

router.get('/priorThreeMonth', function(req, res) {
    connection.query('SELECT * FROM responses WHERE YEAR(temp_time) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH) AND MONTH(temp_time) = MONTH(CURRENT_DATE - INTERVAL 3 MONTH)', function(err, rows) {
        if(err) throw err;
        res.json(rows);
    });
});

router.get('/priorFourMonth', function(req, res) {
    connection.query('SELECT * FROM responses WHERE YEAR(temp_time) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH) AND MONTH(temp_time) = MONTH(CURRENT_DATE - INTERVAL 4 MONTH)', function(err, rows) {
        if(err) throw err;
        res.json(rows);
    });
});

router.get('/priorFiveMonth', function(req, res) {
    connection.query('SELECT * FROM responses WHERE YEAR(temp_time) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH) AND MONTH(temp_time) = MONTH(CURRENT_DATE - INTERVAL 5 MONTH)', function(err, rows) {
        if(err) throw err;
        res.json(rows);
    });
});

router.get('/getSixMonthsGuest', function(req, res) {
    connection.query("SELECT * FROM responses where temp_time  > DATE_SUB(now(), INTERVAL 6 MONTH) and member like '%No%'", function(err, rows) {
        if(err) throw err;
        res.json(rows);
    });
});

router.get('/getSixMonthsMember', function(req, res) {
    connection.query("SELECT * FROM responses where temp_time  > DATE_SUB(now(), INTERVAL 6 MONTH) and member like '%Yes%'", function(err, rows) {
        if(err) throw err;
        res.json(rows);
    });
});

router.get('/memberverify', function(req, res){
    //console.log('hitting member verify route', req.query);
    var codenumber = req.query.member;
    //console.log(codenumber);

    var memberIDverify = {
        url: serverURL +  'SearchMembers.asp?MemberID=' + codenumber,
        headers: {
            Cookie: cookie1 + newCookieHeader
        }
    };

    request(memberIDverify, function(err, response, body){
        res.json(body);
    })
});

//future route for grabbing specific data from thedatabank

//router.get('/memberRevenue', function(req, res){
//
//    var memberRev = {
//        url: serverURL + 'getmembercontributions.asp?rows=1500',
//        headers: {
//            Cookie: cookie1 + newCookieHeader
//        }
//    };
//
//    request(memberRev, function(err, response, body){
//        //console.log("Request mod body", body);
//        res.json(body);
//    })
//});

//thedatabank.com API login below

var serverURL = '';
var cookie1 = '';
var newCookieHeader = '';
request.post({url:'https://api.thedatabank.com/v1.0/login.asp?', form: {username: process.env.username, password: process.env.password }},
    function(err, response, body) {
        cookie1= (response.headers['set-cookie'][0]);
        //console.log("This is var cookie1: ", cookie1);
        var options = {
            url: 'https://api.thedatabank.com/v1.0/secure/init.asp',
            headers: {
                Cookie: cookie1
            }
        };
        function callback(error, response, body) {
            //console.log("This is the successful redirect body: ", body);
            var data = JSON.parse(body);
            newCookieHeader = response.headers['set-cookie'][0];
            serverURL = data.ServerURL;
        }
        request(options, callback);
    });

module.exports = router;