const env = process.env;
const { Sequelize, sequelize, Op, QueryTypes} = require('sequelize');
const {Post, Interest, User} = require('../models');
const model = require('../models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = env.JWT_SECRET;

exports.getPosts = async (req, res, next) => {
    try 
    {    
        const token = req.cookies.token;
        const decode = jwt.verify(token, JWT_SECRET);
        if(decode)
        {
            const posts = await Post.findAll({
                where: { user_id : decode.uid }
            })

            console.log(posts);
            res.json({"posts" : posts});
        }   
        else
        {

        }
    }
    catch(e) 
    {
        res.status(401).json({code:401, message : 'jwt token err'});
    }
}

exports.newPosts = async (req, res, next) => {
    
}