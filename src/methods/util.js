'use strict';

var nodemailer = require('nodemailer');

const mailName = '*';
const password = '*';

//配置邮件
const transporter = nodemailer.createTransport('SMTP',{
    host: "smtp.163.com",
    secureConnection: true,
    port:465,
    auth: {
        user: mailName,
        pass: password
    }
});

function sendMainFun(to, subject, content, callback) {
    var option = {
        from: mailName,
        to
    };
    option.subject = subject;
    option.html= content;
    transporter.sendMail(option, function(error, response){
        if(error){
            callback && callback({fail: error});
        }else{
            callback && callback({success: response.message});
        }
    });
}

module.exports = function () {
     $.sendMail = function(to, subject, content, callback) {
        sendMainFun(to, subject, content, callback);
    };
};