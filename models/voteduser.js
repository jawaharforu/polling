const mongoose = require('mongoose');
const config = require('../config/database');

const VoteduserSchema = mongoose.Schema({
    name: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    ip: {
        type: String
    },
    userdetail: {
        type: Array
    },
    fullderail: {
        type: String
    },
    state: {
        type: String
    },
    region: {
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

const Voteduser = module.exports = mongoose.model('Voteduser', VoteduserSchema);

module.exports.addVoteduser = function(newVoted, callback){
    newVoted.save(callback);
};

module.exports.deleteVoteduser = function(voteduserid, callback){
    Voteduser.remove({_id: voteduserid}, callback);
} ;

module.exports.updateVoteduser = function(voteduserid, updateVoted, callback){
    Voteduser.update({_id: voteduserid},updateVoted, callback);
} ;

module.exports.getUserByMobile = function(mobile, callback){
    const query = {
        mobile: mobile
    }
    Voteduser.findOne(query, callback);
};