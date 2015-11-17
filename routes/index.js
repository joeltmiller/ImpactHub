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

    var post = {name: name, email: email, meeting_with: meeting, member: member,
    twitter: twitter, membership: membership, company: company, email_me: email_me, temp_time: datetime};

    console.log(post);

    connection.query('INSERT INTO responses SET ?', post, function (err) {
        if (err) throw err;

        res.json({route: '/thanks'}); //this is sent to client.js


    });

});

router.get('/data', function (req, res, next) {
    connection.query('SELECT * FROM responses', function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/guestEmails', function (req, res, next) {
    connection.query("SELECT * FROM responses WHERE member like '%No%'  AND email IS NOT NULL ORDER BY temp_time DESC", function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
    //test();
});

router.get('/perWeek', function(req, res) {
    connection.query('SELECT * FROM responses WHERE temp_time BETWEEN NOW()-INTERVAL 7 DAY AND NOW()', function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/perDay', function(req, res) {
    connection.query('SELECT * FROM responses WHERE temp_time > CURDATE();', function (err, rows) {
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

var sessionId = '';
var cookie1 = '';
var cookie2 = '';
//var test = function() {
//    console.log(sessionId, " Global ID");
//    var options = {
//        url: 'https://api.thedatabank.com/v1.0/secure/SearchMembers.asp?lastname=bailey',
//        headers: {
//            Cookie: cookie1,
//            SessionID: sessionId
//        }
//    };
//    function callback(error, response, body) {
//        var info = JSON.parse(body);
//        console.log(info);
//    }
//    request(options, callback);
//};

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

//request.post({url:'https://api.thedatabank.com/v1.0/login.asp?', form: {username: process.env.username, password: process.env.password }},
//function(err, response, body) {
//    console.log(body);
//});

request.post({url:'https://api.thedatabank.com/v1.0/login.asp?', form: {username: process.env.username, password: process.env.password }},
    function(err, response, body) {
        cookie1= (response.rawHeaders[11]);
        cookie2= (response.rawHeaders[13]);
        console.log(cookie1);
        var options = {
            url: 'https://api.thedatabank.com/v1.0/secure/init.asp',
            headers: {
                Cookie: cookie1
                //Cookie: cookie2
            }
        };
        function callback(error, response, body) {
            var data = JSON.parse(body);
            sessionId = data.SessionID;
            console.log(body);
            var options2 = {
                url: 'https://api.thedatabank.com/v1.0/secure/SearchMembers.asp?lastname=bailey',
                headers: {
                    Cookie: cookie1 + cookie2

                }

            };
            //console.log(sessionId);
            request(options2, function(err, response, body) {
                //console.log(body);
            })
        }

        request(options, callback);

        //var options2 = {
        //    url: 'https://api.thedatabank.com/v1.0/secure/SearchMembers.asp?lastname=bailey',
        //    headers: {
        //        Cookie: cookie1,
        //        SessionID: sessionId
        //    }
        //};
        //request(options2, callback);

        //request.post({url:'https://api.thedatabank.com/v1.0/secure/init.asp?', form: {username: process.env.username, password: process.env.password }},
        //function(err, response, body) {
        //    console.log(response);
        //});
        //console.log(response);
    });



//ALSO ACTIVATE REQUIRE REQUEST UP TOP!


module.exports = router;