const mongoose = require('mongoose');
const config = require('../config/database');
const Poll = require('./poll');
const Voteduser = require('./voteduser');

const Result = mongoose.Schema({
    pollid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll',
        required: [true,'No poll id found']
    },
    voteduserid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voteduser',
        required: [true,'No poll id found']
    },
    votedto: {
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