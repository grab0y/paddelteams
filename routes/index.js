// index.js

const express = require('express');

const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');



// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
const User = require('../models/User'); // Asegúrate de haber importado el modelo User de Mongoose;
const Match = require('../models/match'); 

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId, "disponibilidad verified");

       //  const isOwner = []

        // Query MongoDB to retrieve all matches
        const matches = await Match.find();

        // Array to store match data with creator names and phone numbers
        const matchesWithCreatorData = [];

        

        console.log('Usuario encontrado:', req.user.name, req.user.id);

        const selectedCategory = req.query.categoria;
        let users = [];

        if (selectedCategory) {
            // Si se seleccionó una categoría, busca usuarios en esa categoría
            users = await User.find({ categoria: selectedCategory, disponibilidad: true }, "name genero categoria telefono");
        }

        // Render the dashboard page with user data
        res.render('dashboard', {
            user: req.user,
            disponibilidad: user.disponibilidad,
            users: users,
            selectedCategory: selectedCategory || ''
            
            
        });
    } catch (err) {
        console.error('Error retrieving user availability or users:', err);
        req.flash('error_msg', 'Error retrieving user availability or users');
        res.redirect('/dashboard');
    }
});


// Update the route to return only the table HTML
router.get('/dashboard/table', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        

        // Query MongoDB to retrieve all matches
        const matches = await Match.find();

        // Array to store match data with creator names and phone numbers
        const matchesWithCreatorData = [];

        // Iterate over matches to fetch creator data
        for (const match of matches) {
            try {
                // Fetch the user's data using the createdBy ID
                const creator = await User.findById(match.createdBy);

                // Checkear si el usuario es el creador
                const isOwner = (match.createdBy === userId);
                // console.log("owner: ", creator.id, "Usuario: ", req.user.id);
                // Add match data along with creator name and phone number to the array
                matchesWithCreatorData.push({
                    ...match.toObject(),
                    creatorName: creator ? creator.name : 'Unknown', // Use 'Unknown' if user not found
                    creatorPhoneNumber: creator ? creator.telefono : 'Unknown', // Use 'Unknown' if user not found
                    isOwner: isOwner
                });
            } catch (error) {
                console.error('Error fetching creator data:', error);
                // If an error occurs, add match data with 'Unknown' creator name and phone number
                matchesWithCreatorData.push({
                    ...match.toObject(),
                    creatorName: 'Unknown',
                    creatorPhoneNumber: 'Unknown',
                    isOwner: false

                });
            }
        }

        



        // Render the dashboard page with user data
        res.render('partials/table', {
            user: req.user,
            
            
            
            matches: matchesWithCreatorData
        });
    } catch (err) {
        console.error('Error retrieving user availability or users:', err);
        req.flash('error_msg', 'Error retrieving user availability or users');
        res.redirect('/dashboard');
    }

});




module.exports = router;