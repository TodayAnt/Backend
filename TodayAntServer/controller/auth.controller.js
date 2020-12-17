const {User} = require('../models');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); 
const jwt = require('jsonwebtoken');
const passport = require('passport');

const isEmpty = function (value) {
    if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
        return true
    } else {
        return false
    }
};

exports.loginPage = (req, res, next) => {
    res.render('login1');
};

exports.registPage = (req, res, next) => {
    res.render('login');
};

exports.login = (req, res, next) => {
    try{
        passport.authenticate('local', {session : false}, async (authError, user, info) => {
            if(authError)
            {
                console.log(authError);
                console.error(authError);
                return next(authError);
            }

            if (!user) 
            {
                console.log(info.message);
                return res.json({
                    code:400,
                    message:info.message
                });
            }

            try{
                var expiresTime;
                if(user.status==0)
                    expiresTime='60m';
                else
                    expiresTime='1440m'
                
                const token = jwt.sign(
                    {
                        uid : user.id,
                        email : user.email,
                        nickname : user.nickname,
                        gender : user.gender,
                        status : user.status,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn : expiresTime,
                        issuer : 'comeOn',
                    }
                );
                
                const refreshtoken = jwt.sign(
                    { email : user.email },
                    process.env.JWT_SECRET,
                    {
                        expiresIn : '1440m',
                        issuer : 'comeOn',
                    }
                );
                
                User.update(
                    { refresh_token: refreshtoken }, 
                    { where : { email : user.email } }
                );

                res.cookie('token', token, { httpOnly: true });
                return res.redirect('/');
            }
            catch(err)
            {
                console.log(err);
                return res.status(400).json({
                    code:400,
                    message:"에러입니다."
                }).send();
            }
        })(req, res, next); 
    }
    catch(err)
    {
        console.log(err);
        res.send("에러입니다.");
    }
};

exports.regist = async (req, res, next) => {
    var {email,nickname,password,phone_num,gender} = req.body;

    await User.findOne({where:{ email:email }})

    .then(async result=>{
        if(isEmpty(result)!=false)
        {
            var salt = Math.round((new Date().valueOf() * Math.random())) + "";
            var hashpassword = crypto.createHash('sha512').update(password+salt).digest('base64');
            await User.create({
                email:email,
                gmail:gmail,
                gmail_check: (gmail_check) ? 1:0,
                nickname:nickname,
                password:hashpassword,
                salt:salt,
                phone_num:phone_num,
                gender:gender
            })
            .then(result=>{
                res.json({
                    code:200,
                    message:"Join Success"
                });
            })
        }
        else
        {
            return res.status(400).send("이미 가입된 메일입니다.");
        }
    });
};

exports.getNewToken = (req, res, next) => {
    var authorization=req.headers.authorization;
    var refreshtoken = req.headers.refreshtoken;
    var tokenValue=jwt.decode(authorization);
    var email = tokenValue.email;

    User.findOne( { where : { email: email } })

    .then( user => 
    {
        if(isEmpty(user))
        {
            res.json({
                code:400,
                message:"토큰이 만료되었습니다. 재 로그인 해주세요."
            });
        }
        else if(user.refresh_token == refreshtoken)
        {
            var expiresTime;

            if(tokenValue.status==0)
                expiresTime='60m';
            else
                expiresTime='1440m'
            
            const token = jwt.sign(
                {
                    uid : user.user_id,
                    email : tokenValue.email,
                    nickname : tokenValue.nickname,
                    gender : tokenValue.gender,
                    age : tokenValue.age,
                    status : tokenValue.status,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn : expiresTime,
                    issuer : 'comeOn',
                }
            );
            
            res.cookie('token', token, { httpOnly: true });

            res.send('main',{
                code : 200,
                message : '토큰이 발급되었습니다.',
                token,
            }); 

        }
        else
        {    
            res.json('index',{
                code:500,
                message:"토큰이 변조되었습니다. 재 로그인 해주세요."
            });
        }
    });
};

