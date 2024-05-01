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
      const { day, time, court, categoria, faltantes, comentarios } = req.body;
  
      // Assuming user information is stored in req.user after authentication
      const userId = req.user._id; // Assuming user ID is stored in _id field

      // const dayAsDate = moment(day, 'DD-MM-YYYY').toDate();
  
      const newMatch = new Match({
        day,
        time,
        court,
        categoria,
        faltantes,
        createdBy: userId,
        comentarios, // Assuming you have a createdBy field in your Match schema
      });
  
      await newMatch.save();
      console.log("Nuevo partido añadido. Creador: " , req.user.name)
      req.flash('success_msg', '¡Tu partido ha sido añadido!');
      res.redirect('/dashboard');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  



  // Endpoint to edit match details
router.post('/edit', async (req, res) => {
  try {
      const matchId = req.body.matchId;
      const updatedFaltantes = req.body.faltantes;

      // Update the 'faltantes' field of the match
      await Match.findByIdAndUpdate(matchId, { faltantes: updatedFaltantes });
      req.flash('success_msg', '¡Tu partido ha sido editado!');

      // Redirect to dashboard or send a success response
      res.redirect('/dashboard');
  } catch (error) {
      console.error('Error editing match:', error);
      res.status(500).send('Error editing match');
  }
});

// Endpoint to remove a match by ID
router.post('/remove', async (req, res) => {
  try {
      const matchId = req.body.matchId1;
      

      // Remove the match from the database
      await Match.findByIdAndRemove(matchId);
      console.log("Partido eliminado. ID: ", matchId);
      req.flash('success_msg', '¡Tu partido ha sido elimiado!');

      // Redirect to dashboard or send a success response
      res.redirect('/dashboard');
  } catch (error) {
      console.error('Error removing match:', error);
      res.status(500).send('Error removing match');
  }
});

  module.exports = router;