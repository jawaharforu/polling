const mongoose = require('mongoose');
const config = require('../config/database');

const Voteduser = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    mobile: {
        type: Number
    },
    email: {
        type: String
    },
    createdon: {
        type: Date,
        default: Date.now
    },
    updatedon: {
        type: Date,
        default: Date.now
    }
});