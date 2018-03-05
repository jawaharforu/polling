const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Poll = require('../models/poll');

// Get polls
router.get('/polls', (req, res, next) => {
    Poll.getAllPolls((err, poll) => {
        if(err) throw err;
        res.json({success: true, data: poll});
    });
});

// get poll by id
router.get('/poll/:pollid', (req, res, next) => {
    Poll.getPollById(req.params.categoryid, (err, poll) => {
        if(err) throw err;
        res.json({success: true, data: poll});
    });
});

router.post('/poll', (req, res, next) => {
    let newPoll = new Poll({
        name: req.body.name,
        type: req.body.type,
        status: req.body.status,
        categoryid: req.body.categoryid,
        options: req.body.options
    }); 
    Poll.addPoll(newPoll, (err, poll) => {
        if(err){
            res.json({success: false, msg: 'Failed to add Poll'});
        }else{
            res.json({success: true, msg: 'Poll Add', data: poll});
        }
    });
});

module.exports = router;