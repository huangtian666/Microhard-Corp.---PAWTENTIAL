const { sendVerificationEmail } = require('./emailService.tsx');

const testEmail = async () => {
  const email = 'ht47275@gmail.com'; // Replace with the recipient's email
  const code = '123456'; // Replace with your verification code

  try {
    await sendVerificationEmail(email, code);
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Failed to send verification email:', error);
  }
};

testEmail();

