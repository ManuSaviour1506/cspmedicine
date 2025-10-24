// server/src/services/emailService.js
const nodemailer = require('nodemailer');

// Check if credentials exist before creating the transporter
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
let transporter;

if (EMAIL_USER && EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services or SMTP
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
} else {
  console.warn('WARNING: EMAIL_USER or EMAIL_PASS not set. Email reminders are disabled.');
}

exports.sendEmailReminder = async (to, subject, text) => {
  if (!transporter) {
    console.error('Email reminder skipped: Transporter not initialized due to missing credentials.');
    return;
  }
  
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email reminder sent successfully! Info:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};