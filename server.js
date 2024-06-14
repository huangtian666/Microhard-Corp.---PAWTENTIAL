const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('../serviceKey.json');
//const {HttpsProxyAgent} = require('https-proxy-agent');

//const proxy = 'http://127.0.0.1:7890';
//const agent = new HttpsProxyAgent(proxy);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //httpAgent: agent,
})

const app = express();
const port = 3001;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
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
    from: '<no-reply@pawtentialteam@gmail.com>', // Gmail address you are authenticated with
    replyTo: 'no-reply@pawtentialteam.com', // No-reply address
    to: email.trim().toLowerCase(),
    subject: 'Password Reset Verification Code',
    text: `Hello,

    Please use the following verification code to reset your password:
    Verification Code: ${code}
    
    If you did not request a password reset, please ignore this email.
    
    Best regards,
    Pawtential`,
  };


  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending email:', error);
        reject(new Error('Failed to send verification email'));
      } else {
        console.log('Email sent: ' + info.response);
        resolve(info.response);
      }
    });
  });
};

// Data structure to store email, code, and timestamp
let verificationData = {};

app.post('/send-verification-email', async (req, res) => {
  const { email, code } = req.body;
  const timestamp = Date.now();
  verificationData[email] = { code, timestamp }; // Store the code and timestamp

  try {
    await sendVerificationEmail(email, code);
    res.status(200).json({ message: 'Verification email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send verification email' });
  }
});

app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;
  const data = verificationData[email];

  if (!data) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const { code: storedCode, timestamp } = data;
  const currentTime = Date.now();
  const isValid = code === storedCode && (currentTime - timestamp) <= 5 * 60 * 1000; // 5 minutes

  if (isValid) {
    return res.status(200).json({ message: 'Code verified successfully' });
  } else {
    return res.status(400).json({ message: 'Invalid or expired code' });
  }
});

app.post('/reset-password', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.time('getUserByEmail');
    const user = await admin.auth().getUserByEmail(email);
    console.timeEnd('getUserByEmail');

    console.time('updateUser');
    await admin.auth().updateUser(user.uid, { password });
    console.timeEnd('updateUser');

    res.status(200).send('Password reset successfully');
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send('Failed to reset password');
  }
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://192.168.101.29:${port}`);
});

