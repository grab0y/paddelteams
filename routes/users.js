// router/users.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

const { ensureAuthenticated } = require('../config/auth');
const generateRandomToken = require('../utils/token');

const sendVerificationEmail = require('../utils/validate-email');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, password2, categoria, genero, telefono } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2 || !categoria || !genero || !telefono) {
      errors.push({ msg: 'Por favor, complete todos los datos' });
    }

    if (password != password2) {
      errors.push({ msg: 'Las contraseñas no coinciden' });
    }

    if (password.length < 6) {
      errors.push({ msg: 'La contraseña debe tener al menos 6 caracteres' });
    }

    if (errors.length > 0) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
        categoria,
        genero,
        telefono
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      errors.push({ msg: 'Email already exists' });
      return res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
        categoria,
        genero,
        telefono
      });
    }

    const verificationToken = await generateRandomToken();
    console.log("Token Generado:" , verificationToken);

    const telefonoConPrefijo = "+549" + telefono;

    const newUser = new User({
      name,
      email,
      password,
      categoria,
      genero,
      telefono: telefonoConPrefijo,
      valid_token: verificationToken // Assign the verification token
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    await newUser.save();
    await sendVerificationEmail(newUser.email, verificationToken)

    // Send verification email
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/users/login');
    console.log("Nuevo usuario registrado: ", newUser.name);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});



// Cambio de disponibilidad
router.post('/availability', ensureAuthenticated, (req, res) => {
  console.log('Usuario cambió su estado:', req.body, req.user.name);
  const userId = req.user.id;
  const newStatus = req.body.available;

  // Update the user's availability status in the database
  User.findByIdAndUpdate(userId, { disponibilidad: newStatus }, (err, user) => {
    if (err) {
      console.error('Error updating user availability:', err);
      req.flash('error_msg', 'Error updating user availability');
    } else {
      req.flash('success_msg', '¡Tu estado ha sido actualizado!');
    }
    // Redirect back to the dashboard page
    res.redirect('/dashboard');
  });
});


// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', '¡Te esperamos pronto!');
  res.redirect('/users/login');
});


// Verificacion de cuenta
router.get('/verify', async (req, res) => {
  const userId = req.query.userId;
  const token = req.query.token;

  try {
      // Retrieve the user from the database based on the userId
      const user = await User.findById(userId);

      if (user.verified) {
        req.flash('error_msg', '¡Su cuenta ya se encuentra verificada!');
        return res.redirect('/users/login');
      }  

      // Check if the user exists and if the token matches
      if (user && user.valid_token === token) {
        console.log("Usuario:" , user.name , "ha verificado su cuenta")
        user.verified = true;


            
        // Save the updated user object back to the database
        await user.save();
        req.flash('success_msg', '¡Cuenta verificada!');
        res.redirect('/users/login');
          
      } else {
          // Tokens don't match or user not found, send a response indicating failure
          res.status(400).send('Invalid token');
      }
  } catch (error) {
      // Handle any errors that occur during the database query
      console.error('Error verifying email:', error);
      res.status(500).send('Internal server error');
  }
});

module.exports = router;