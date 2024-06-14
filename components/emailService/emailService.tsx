const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  service: 'Gmail',
  auth: {
    user: 'pawtentialteam@gmail.com',
    pass: 'petm sgey mhkk xkmu',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendVerificationEmail = (email, code) => {
  const mailOptions = {
    from: 'pawtentialteam@gmail.com',
    to: email,
    subject: 'Password Reset Verification Code',
    text: `Your verification code is ${code}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send verification email');
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendVerificationEmail };
