const env = process.env;
const { Sequelize, sequelize, Op, QueryTypes} = require('sequelize');
const {Post, Interest, User} = require('../models');
const model = require('../models');
const jwt_util = require('../js/jwt_util');

getInterestData = async (interest, id) => {
    return new Promise(res => {
        let interest_array = [];
        for(let i = 0; i <= interest.length; i++)
        {
            if(i==interest.length)
                resolve(interest_array);
            let data = interest.split('/');
            let json = {
                user_id: id,
                item: data[0]
            };
            for(let j = 1; j < data.length; j++)
            {
                json['keyword'+(j)] = data[j];
            }
            interest_array.push(json);
        }
    })
}

exports.interestPage = async (req, res, next) => {
    try 
    {    
        let token = jwt_util.getAccount(req.cookies.token);

        if(token)
        {
            res.render('inter');
        }   
        else
        {
            res.redirect('/');
        };
    }
    catch(e) 
    {
        console.log(e);
        res.status(401).json({code:401, message : 'jwt token err'});
    }
}


exports.getInterest = async (req, res, next) => {
    try 
    {    
        let token = jwt_util.getAccount(req.cookies.token);
        if(token)
        {
            Interest.findAll({
                attributes: ['item','keyword1','keyword2','keyword3','keyword4','keyword5','keyword6','keyword7','keyword8','keyword9','keyword10'],
                where : {user_id : token.uid}
            })
            .then( interests => {   
                res.json({interests: interests});
            })
            .catch(e => {
                console.log(e);
            })
        }   
        else
        {
            res.redirect('/');
        }
    }
    catch(e) 
    {
        res.status(401).json({code:401, message : 'jwt token err'});
    }
}

exports.setInterest = async (req, res, next) => {
    try 
    {    
        let token = jwt_util.getAccount(req.cookies.token);
        const interest = req.body.interest;
        const interest_array = await getInterestData(interest, token.uid);
        console.log(interest_array);
        if(token)
        {
            Interest.bulkCreate( interest_array)
            .then()
            .catch(e => {
                console.log(e);
            });
        }   
        else
        {
            res.redirect('/');
        }
    }
    catch(e) 
    {
        res.status(401).json({code:401, message : 'jwt token err'});
    }
}