const env = process.env;
const { Sequelize, sequelize, Op, QueryTypes} = require('sequelize');
const {Post, Interest, User} = require('../models');
const model = require('../models');
const jwt_util = require('../js/jwt_util');
const JWT_SECRET = env.JWT_SECRET;

exports.indexPage = (req, res, next) => {
    try 
    {    
        let token = jwt_util.getAccount(req.cookies.token);
        console.log(token);
        if(token)
        {
            Post.findAll({
                where: { user_id : token.uid }
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
