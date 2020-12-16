const env = process.env;
const { Sequelize, sequelize, Op, QueryTypes} = require('sequelize');
const {Post, Interest, User} = require('../models');
const model = require('../models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = env.JWT_SECRET;

exports.indexPage = (req, res, next) => {
    try 
    {    
        const token = req.cookies.token;
        if(token)
        {
            const decode = jwt.verify(token, JWT_SECRET);

            console.log(decode);
            Post.findAll({
                where: { user_id : decode.uid }
            })

            .then( posts => {
                res.render('post_ajax', {"posts" : posts});
            })
        }   
        else
        {
            res.render('main');
        }
    }
    catch(e) 
    {
        console.log(e);
        res.status(401).json({code:401, message : 'jwt token err'});
    }
}
