const mongoose = require('mongoose');
const config = require('../config/database');
const Poll = require('./poll');
const Voteduser = require('./voteduser');

const ResultSchema = mongoose.Schema({
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

const Result = module.exports = mongoose.model('Result', ResultSchema);

module.exports.addResult = function(newResult, callback){
    newResult.save(callback);
};

module.exports.deleteResult = function(resultid, callback){
    Result.remove({_id: resultid}, callback);
} ;

module.exports.updateResult = function(resultid, updateResult, callback){
    Result.update({_id: resultid},updateResult, callback);
} ;

module.exports.getResult = function(pollid, callback){
    Result.aggregate(
        [
           {$match: {
               'pollid': mongoose.Types.ObjectId(pollid)
           }},
           {$group: {
                _id: '$votedto', 
                userid: {$addToSet: '$_id'}
            }},
            {$project: {
                _id: 0, 
                option: '$_id', 
                voteCount: {$size: '$userid'}
            }}
        ]
     , callback);
}