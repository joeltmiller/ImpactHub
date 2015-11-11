var express = require('express');
var path = require('path');
var mysql = require('mysql');
var router = express.Router();
var request = require('request');

//Loading in the sql database
var connection = mysql.createConnection({
    host: 'merkedyou.com',
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
    var meeting = req.body.meeting;
    var twitter = req.body.twitter;
    var member = req.body.member;
    var email_opt_in = req.body.email_opt_in;

    if(member == "on"){
        member = 1;
    }else{
        member = 0;
    }

    if(email_opt_in == "on"){
        email_opt_in = 1;
    }else{
        email_opt_in = 0;
    }

    var post = {fullname: name, email: email, meeting_with: meeting,
    twitter: twitter, member: member, email_opt_in: email_opt_in
    };

    console.log(post);

    connection.query('INSERT INTO guest SET ?', post, function (err) {
        if (err) throw err;

        res.redirect('views/thanks.html');

    });

});

router.get('/data', function (req, res, next) {
    connection.query('SELECT * FROM guest', function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
});


//ALSO ACTIVATE REQUIRE REQUEST UP TOP!
//request('http://www.omdbapi.com/?t=batman', function (error, response, body) {
//    if (!error && response.statusCode == 200) {
//        console.log(body)
//    }
//});

request.get('https://api.thedatabank.com/v1.0/login.asp?').auth('IMPSP_API', 'p8nRDaD2X0wc', false).on('response', function(response) {
    //console.log(response.statusCode);
    //console.log(response.headers['content-type']);
    //console.log(response);
});

//request.get('https://api.thedatabank.com/v1.0/secure/SearchMembers.asp?lastname=bailey').auth('IMPSP_API', 'p8nRDaD2X0wc', false).on('response', function(response) {
//       if (!error && response.statusCode == 200) {
//   console.log(response);
//}
//    });





//https://api.thedatabank.com/v1.0/login.asp?username=IMHSP_API&password=p8nRDaD2X0wc
//http://www.omdbapi.com/?t=batman
module.exports = router;