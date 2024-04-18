require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Email options
const mailOptions = {
  
  to: 'gastonraboy@gmail.com',
  subject: 'Validación de email',
  text: 'This is a test email from Nodemailer!'
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
