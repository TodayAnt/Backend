const env = process.env;
const { Sequelize, sequelize, Op, QueryTypes} = require('sequelize');
const {Post, Interest, User} = require('../models');
const model = require('../models');
const jwt_util = require('../js/jwt_util');
const JWT_SECRET = env.JWT_SECRET;

exports.indexPage = async (req, res, next) => {
    try 
    {    
        let token = jwt_util.getAccount(req.cookies.token);
        //console.log(token);
        if(token)
        {
            const posts = await Post.findAll({
                include: [{
                    model: Interest,
                    attributes: ['item','code','keyword1','keyword2','keyword3','keyword4','keyword5','keyword6','keyword7','keyword8','keyword9','keyword10',],
                    where: {}
                }],
                where: { user_id : token.uid }
            })
            
            res.render('index', {"posts" : posts, 'login': 1});
        }   
        else
        {
            res.render('index', {'login':0});
        }
    }
    catch(e) 
    {
        console.log(e);
        res.status(401).json({code:401, message : 'jwt token err'});
    }
}