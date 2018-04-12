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

module.exports.getOptionResult = function(pollid, callback){
    Result.aggregate(
        [
            {$match: {
                'pollid': mongoose.Types.ObjectId(pollid)
            }},
            { $group: {
                 _id: {
                     "state": "$state",
                     "votedto": "$votedto"
                 },
                 "votecount": { "$sum": 1 }
             }},
             { $group: {
                 _id: "$_id.state",
                 votedto: { 
                     "$push": { 
                         "votedto": "$_id.votedto",
                         "count": "$votecount"
                     },
                 },
                 "count": { "$sum": "$votecount" }
             }},
             { $project: {
                 "votedto": { "$slice": [ "$votedto", 2 ] },
                 "count": 1
             }}
         ]
     , callback);
}

module.exports.getOptionResultState = function(pollid, state, callback){
    Result.aggregate(
        [
            {$match: {
                'pollid': mongoose.Types.ObjectId(pollid),
                'state': state
            }},
            { $group: {
                 _id: {
                     "region": "$region",
                     "votedto": "$votedto"
                 },
                 "votecount": { "$sum": 1 }
             }},
             { $group: {
                 _id: "$_id.region",
                 votedto: { 
                     "$push": { 
                         "votedto": "$_id.votedto",
                         "count": "$votecount"
                     },
                 },
                 "count": { "$sum": "$votecount" }
             }},
             { $project: {
                 "votedto": { "$slice": [ "$votedto", 2 ] },
                 "count": 1
             }}
         ]
     , callback);
}

module.exports.getPreviousPolls = function(mobile, callback){
    Result.aggregate(
        [
            {
                $lookup: {
                    from: 'votedusers',
                    localField: 'voteduserid',
                    foreignField: '_id',
                    as: 'voterdetail'
                }
            },
            {
                $match: {
                    'voterdetail.mobile': mobile
                }
            },
            {
                $group: {
                    _id: '$pollid'
                }
            },
        ]
     , callback);
}