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
                attributes: ['upload_time', 'keyword_num', 'headline','summary', 'cur_price', 'fluct'],
                include: [{
                    model: Interest,
                    attributes: ['item','code','keyword1','keyword2','keyword3','keyword4','keyword5','keyword6','keyword7','keyword8','keyword9','keyword10',],
                    where: {}
                }],
                where: { user_id : decode.uid },
                order: ['upload_time','DESC'],
            })

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