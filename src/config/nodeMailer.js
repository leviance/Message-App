import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'uinichat@gmail.com',
    pass: 'drdung1999'
  }
});

let sendMailerActive = (receiverEmail,linkActive) => {
  return new Promise( async (resolve, reject) => {
    let mailOptions = {
      from: 'unichat@gmail.com',
      to: receiverEmail,
      subject: 'Bạn nhận được email này vì đã đăng ký tài khoản UniChat',
      text: 'Dưới đây là link xác thực tài khoản của bạn, nếu có nhầm lẫn vui lòng bỏ qua email này xin chân thành cảm ơn !',
      html: `<a href="${linkActive}">Click vào đấy để xác thực tài khoản của bạn.</a>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return reject(false);
      } else {
        return resolve(true);
      }
    });
  })
}

export const sendMail = sendMailerActive;