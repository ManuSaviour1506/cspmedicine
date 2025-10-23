// server/src/services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services or SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmailReminder = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email reminder sent successfully!', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};