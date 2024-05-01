const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const User = require('../models/User'); // Assuming this is the file path to your User model

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'paddelteamsroqueperez@gmail.com',
    pass: 'xkdlhqmuimpvrapl'
  }
});

// Function to send verification email
const sendVerificationEmail = async (email, verificationToken) => {
  try {
    // Find the user by email to retrieve the user ID
    const user = await User.findOne({ email });
    // console.log(user)

    // Check if the user exists
    if (!user) {
      throw new Error('User not found');
    }

    // Email template
    const mailOptions = {
      from: 'your_email@example.com',
      to: email,
      subject: 'Por favor, verifica tu correo electrónico',
      html: `<p>Hola ${user.name},</p>
             <p>Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico:</p>
             <p><a href="http://paddel.team:3000/users/verify?userId=${user._id}&token=${verificationToken}">Verificar correo electrónico</a></p>`
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Se ha enviado el correo de verificación a ${user.email}`);

  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

module.exports = sendVerificationEmail;