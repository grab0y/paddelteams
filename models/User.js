// /models/user.ja
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    categoria: {
        type: String,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    disponibilidad: {
        type: Boolean,
        required: true,
        default: false,
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    valid_token:{
        type: String,
        required: true,
        default: "xxx"
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;