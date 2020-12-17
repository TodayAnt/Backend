const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const {google} = require('googleapis');
//const { OAuth2Client } = require('google-auth-library');

const env = process.env;

const oauth2Client = new google.auth.OAuth2(
    env.CLIENT_ID,
    env.CLIENT_SECRET,
    env.REDIRECT_URL
)

const scopes = [
    'https://mail.google.com/'
]

const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
})

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
    //const {tokens} = await oauth2Client.getToken(code)
    //eoauth2Client.setCredentials(tokens);
    console.log(tokens);
    res.render('google_form', { "code" : code});
});


module.exports = router;
