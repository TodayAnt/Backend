const env = process.env;
const { Sequelize, sequelize, Op, QueryTypes} = require('sequelize');
const {Post, Interest, User} = require('../models');
const model = require('../models');
const nodemailer = require('nodemailer');

const ejs = require('ejs');
const smtpTransport = require('nodemailer-smtp-transport');
const jwt_util = require('../js/jwt_util');


// 메일발송 객체
let mailSender = {
	// 메일발송 함수
    send : async function(param){
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          port : 587,
          host :'smtp.gmlail.com',
          secure : false,
          requireTLS : true,
          auth: {
            user: env.TEST_GMAIL2,
            pass: env.TEST_PASS
          }
      });
      // 메일 옵션
      let mailOptions = {
          from: 'fortice728@gmail.com',
          to: param.toEmail, // 수신할 이메일
          subject: param.subject, // 메일 제목
          text: param.text, // 메일 내용
          html: param.html
      };
      // 메일 발송    
      await transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
      });
    }
}

exports.sendGmail = (req,res,next) => {
    let {user_id, interest_id, keyword_num} = req.body;
    user_id=1, interest_id=1, keyword_num=1;
    let query = `
      SELECT email, gmail, gmail_check, item, :keyword as keyword, headline, summary, upload_time
      FROM users as u, interests as i, posts as p
      WHERE ( 
        u.id = :user_id AND i.id = :interest_id 
        AND u.id=i.user_id AND u.id=p.user_id AND i.id=p.interest_id 
      )`;

    model.sequelize.query(
      query,
      {
          replacements: {
            'keyword': 'keyword'+keyword_num,
            'user_id': user_id,
            'interest_id': interest_id
          },
          type: QueryTypes.SELECT
      }
    )
    .then( posts => {
      if(posts[0].gmail_check)
      {
        let mailParams = {
          toEmail : posts[0].gmail,  
          subject  : 'Today Ant - 설정하신 종목/키워드에 대한 새로운 소식입니다.',
          text : `설정하신 관심 종목에 맞는 뉴스를 찾았습니다.`,
          html : '<ul><li>Upload Time  :  '+ posts[0].upload_time + '</li><li> 관심 종목/키워드  :  ' + posts[0].item +'/'+posts[0].keyword + '</li><li>기사 제목  :  ' + posts[0].headline + '</li><li>요약 내용  :  ' + posts[0].summary
        };
        mailSender.send(mailParams);
      }
    })
    .then( next => {
      res.status(200).send({'message' : 'mail send success'});
    })
}