var express = require('express');
var path = require('path');
var mysql = require('mysql');
var router = express.Router();

var moment = require('moment');
var request = require('request');


//Loading in the sql database
var connection = mysql.createConnection({
    host: '66.147.244.241',
    user: 'merkedyo_impact',
    password: 'test123',
    database: 'merkedyo_impact_hub'
});


/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});


//Form Post
router.post('/guest', function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var member = 0;
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
    connection.query('SELECT * FROM responses WHERE temp_member = 0 AND email IS NOT NULL ORDER BY temp_time DESC', function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
});


//ALSO ACTIVATE REQUIRE REQUEST UP TOP!
//request.jsonp('http://www.omdbapi.com/?t=batman', function (error, response, body) {
//    if (!error && response.statusCode == 200) {
//        console.log(body)
//    }
//});

//request.get('https://api.thedatabank.com/v1.0/login.asp?').auth('IMPSP_API', 'p8nRDaD2X0wc', false).on('response', function(response) {
    //console.log(response.statusCode);
    //console.log(response.headers['content-type']);
    //console.log(response);
//});

//request.get('https://api.thedatabank.com/v1.0/secure/SearchMembers.asp?lastname=bailey&callback=JSON_CALLBACK').on('response', function (response) {
//    console.log(response.statusCode);
//    console.log(response.headers['content-type']);
//    console.log(response.data);
//});

request.get({url: "https://api.thedatabank.com/v1.0/login.asp?username=***&password=***"}, function(e, r, json) {
    console.log(json);
    console.log(e);
    //console.log(r);
});

//var options = {
//    //url: 'https://api.thedatabank.com/v1.0/secure/SearchMembers.asp?lastname=bailey'
//    url:'https://api.thedatabank.com/v1.0/login.asp?username=IMHSP_API&password=p8nRDaD2X0wc'
//};
//function callback(error, response, body) {
//    if (!error && response.statusCode == 200) {
//        var info = JSON.parse(body);
//        console.log(response);
//        console.log(info, "This was the info");
//    }
//}
//request(options, callback);
//request.get('https://api.thedatabank.com/v1.0/secure/SearchMembers.asp?lastname=bailey').auth('IMPSP_API', 'p8nRDaD2X0wc', false).on('response', function(response) {
//       if (!error && response.statusCode == 200) {
//   console.log(response);
//}
//    });




//https://api.thedatabank.com/v1.0/login.asp?username=IMHSP_API&password=p8nRDaD2X0wc
//http://www.omdbapi.com/?t=batman
module.exports = router;