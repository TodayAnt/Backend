const env = process.env;
const { Sequelize, sequelize, Op, QueryTypes} = require('sequelize');
const {Post, Interest, User, Itemcode} = require('../models');
const model = require('../models');
const jwt_util = require('../js/jwt_util');


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

let getInterestData = async (interest, id) => {
    return new Promise(resolve => {
        let data = interest.split('/');
        let json = {
            user_id: id,
            item: data[0]
        };
        for(let j = 1; j < data.length; j++)
        {
            json['keyword'+(j)] = data[j];
        }
        resolve(json);
    })
}

let insertData = async (interest, uid) => {
    let interest_json = await getInterestData(interest, uid);
    Interest.findOne({
        attributes: ['item','keyword1','keyword2','keyword3','keyword4','keyword5','keyword6','keyword7','keyword8','keyword9','keyword10'],
        where : {
            user_id : uid,
            item : interest_json.item
        }
    })
    .then( interest => {
        if(interest)
        {
            let count = 1;
            for(j in interest.dataValues)
            {
                if(interest[j] == null)
                {
                    interest[j] = interest_json['keyword' + count];
                    if(count == Object.keys(interest_json).length - 2)
                        break;
                    count++;
                }
            }
            console.log('update');
            Interest.update(
                interest.dataValues,
                {
                    where: {
                        user_id: uid,
                        item : interest_json.item
                    } 
                }
            ).catch(e => console.log(e));
        }
        else
        {
            Interest.create(interest_json).catch(e => console.log(e));
        }
    }).catch(e => console.log(e));
}

exports.setInterest = async (req, res, next) => {
    try 
    {    
        let token = jwt_util.getAccount(req.cookies.token);
        if(token)
        {
            let interest = req.body.interest;
            if(typeof interest == "object")
            {
                console.log('object');
                for(i in interest)
                    await insertData(interest[i],token.uid);
                res.redirect('/interest');
            }
            else
            {
                console.log('string');
                await insertData(interest,token.uid);
                res.redirect('/interest');
            }
        }   
        else
        {
            res.redirect('/');
        }
    }
    catch(e) 
    {
        console.log(e);
        res.status(401).json({code:401, message : 'jwt token err'});
    }
}

exports.interestOk = (req, res, next) => {
    try 
    {    
        let token = jwt_util.getAccount(req.cookies.token);
        let interest = req.body.interest;
        if(interest.indexOf('/') != -1)
            interest = interest.split('/')[0];
        if(token)
        {
            let query = `
                SELECT item
                FROM itemcode
                WHERE (item=:item)`;

            model.sequelize.query(
                query,
                {
                    replacements: {'item' : interest },
                    type: QueryTypes.SELECT
                }
            )
            .then( item => {
                console.log(item);
                if(item.length != 0)
                {
                    res.json({ ok:1 });
                }
                else
                {
                    res.json({
                        ok:0,
                        message: interest + '은/는 종목 목록에 없습니다. 정확한 이름을 입력해주세요 ex) 삼성전자, 카카오'
                    });
                }
            })
        }   
        else
        {
            res.redirect('/');
        }
    }
    catch(e) 
    {
        console.log(e);
        res.status(401).json({code:401, message : 'jwt token err'});
    }
}