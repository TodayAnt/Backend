const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');

router.get('/', function(req, res, next) {
    // var authorization=req.headers.authorization;
    // var refreshtoken = req.headers.refreshtoken;
    // var tokenValue=jwt.decode(authorization);
    // var email = tokenValue.email;
    console.log("test");
    res.render('google_auth', { title: 'google_form', status: 1 });
});


router.get('/code',function(req,res,next){
    const code = req.query.code;
    console.log(req.query);
    res.render('google_form', { "code" : code});
});


module.exports = router;
