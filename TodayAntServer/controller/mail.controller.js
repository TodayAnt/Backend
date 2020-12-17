const env = process.env;
const nodemailer = require('nodemailer');
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
          text: param.text // 메일 내용
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
    let token = jwt_util.getAccount(req.cookies.token);
    
    let mailParams = {
        toEmail : token.gmail,
        subject  : 'Today Ant - 설정하신 종목/키워드에 대한 새로운 소식입니다.',
        text : 'New information of __'
    };
    mailSender.send(mailParams); 
}