// models/Match.js

// Import mongoose
const mongoose = require('mongoose');

// Define the URI for the matches database
// const matchesDBURI = 'mongodb://localhost:27017/matches'; // Modify this according to your database setup

// Create a separate connection for the matches database
// const matchesDB = mongoose.createConnection(matchesDBURI, { useNewUrlParser: true, useUnifiedTopology: true });

const matchSchema = new mongoose.Schema({
    court: {
        type: String,
        required: true
    },
    day: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    faltantes: {
        type:Number,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    comentarios: {
        type: String,
        required: true,
        default: "¡Sumate a jugar con nosotros!"
    }

});


const Match = mongoose.model('Match', matchSchema);

module.exports = Match;