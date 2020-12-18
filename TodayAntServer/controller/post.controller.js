const env = process.env;
const { Sequelize, sequelize, Op, QueryTypes} = require('sequelize');
const {Post, Interest, User} = require('../models');
const model = require('../models');
const jwt_util = require('../js/jwt_util');


exports.getPosts = async (req, res, next) => {
    try 
    {    
        const token = jwt_util(req.cookies.token);
        if(token)
        {
            const posts = await Post.findAll({
                attributes: ['upload_time', 'keyword_num', 'headline','summary', 'fluct'],
                include: [{
                    model: Interest,
                    attributes: ['item','code','keyword1','keyword2','keyword3','keyword4','keyword5','keyword6','keyword7','keyword8','keyword9','keyword10',],
                    where: {}
                }],
                where: { user_id : token.uid },
                order: [['upload_time','DESC']]
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