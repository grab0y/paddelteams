// router/matches.js
const moment = require('moment'); // Import moment.js library
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const Match = require('../models/match');
const { forwardAuthenticated } = require('../config/auth');

const { ensureAuthenticated } = require('../config/auth');


// const sendVerificationEmail = require('../utils/validate-email');


// Route for adding a new match invitation
router.post('/add',  async (req, res) => {
    try {
      const { day, time, court, categoria, faltantes } = req.body;
  
      // Assuming user information is stored in req.user after authentication
      const userId = req.user._id; // Assuming user ID is stored in _id field

      // const dayAsDate = moment(day, 'DD-MM-YYYY').toDate();
  
      const newMatch = new Match({
        day,
        time,
        court,
        categoria,
        faltantes,
        createdBy: userId, // Assuming you have a createdBy field in your Match schema
      });
  
      await newMatch.save();
      console.log("Nuevo partido añadido. Creador: " , req.user.name)
      req.flash('success_msg', '¡Tu partido ha sido añadido!');
      res.redirect('/dashboard');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;