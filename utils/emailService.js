const nodemailer = require('nodemailer');

// Function to send a verification code email
const sendVerificationCodeEmail = async (email, msg) => {
  // Create a nodemailer transporter with your email credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.addEmail,
      pass: process.env.passapp,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Contenu du message
  const message = {
    from: process.env.addEmail,
    to: email,
    subject: 'Verification Code',
    text:msg,
  };

  try {
    // Send the verification code to the user via email
    const info = await transporter.sendMail(message);
    console.log('Email sent:', info);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

module.exports = {sendVerificationCodeEmail,
};

