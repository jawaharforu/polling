const mongoose = require('mongoose');
const config = require('../config/database');
const Category = require('./category');
const Result = require('./result');
// Poll schema

const PollSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    },
    trending: {
        type: Boolean,
    },
    home: {
        type: Boolean,
    },
    fromdate: {
        type: Date
    },
    todate: {
        type: Date
    },
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true,'No category id found']
    },
    options: {
        type: Array
    },
    image: {
        type: String
    },
    result: {
        type: Boolean,
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

const Poll = module.exports = mongoose.model('Poll', PollSchema);

module.exports.getAllPolls = function(callback) {
    Poll.aggregate([
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryid',
                foreignField: '_id',
                as: 'categoryname'
            }
        }
    ], callback);
};

module.exports.getPollById = function(pollid, callback) {
    //Poll.findById(pollid, callback);
    Poll.aggregate([
        { 
            $match: {
                '_id': mongoose.Types.ObjectId(pollid)
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryid',
                foreignField: '_id',
                as: 'categoryname'
            }
        }
    ], callback);
};

module.exports.getPollByStatus = function(callback) {
    //Poll.findById(pollid, callback);
    Poll.aggregate([
        { 
            $match: {
                'status': true
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryid',
                foreignField: '_id',
                as: 'categoryname'
            }
        }
    ], callback);
};

module.exports.getPollByStatusHome = function(callback) {
    //Poll.findById(pollid, callback);
    Poll.aggregate([
        { 
            $match: {
                'home': true
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryid',
                foreignField: '_id',
                as: 'categoryname'
            }
        }
    ], callback);
};

module.exports.addPoll = function(newPoll, callback) {
    newPoll.save(callback);
};

module.exports.updatePoll = function(pollid, updatedPoll, callback) {
    Poll.update({_id: pollid},updatedPoll, callback);
};

module.exports.deletePoll = function(pollid, callback) {
    Poll.remove({_id: pollid}, callback);
};

module.exports.getPollByCategory = function(categoryid, callback) {
    //Poll.findById(pollid, callback);
    Poll.aggregate([
        { 
            $match: {
                'categoryid': mongoose.Types.ObjectId(categoryid),
                'status': true
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryid',
                foreignField: '_id',
                as: 'categoryname'
            }
        },
        {
            $lookup: {
                from: 'results',
                localField: '_id',
                foreignField: 'pollid',
                as: 'pollcount'
            }
        },
        { $sort: { createdon: -1 } },
    ], callback);
};

