const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Voteduser = require('../models/voteduser');

// add voter
router.post('/voteduser', (req, res, next) => {
    let newVoted = new Voteduser({
        ip: req.body.ip,
        userdetail: req.body.userdetail,
        mobile: ''
    });
    Voteduser.addVoteduser(newVoted, (err, voteduser) => {
        if(err){
            res.json({success: false, msg: 'Failed to add Voteduser'});
        }else{
            res.json({success: true, msg: 'Voteduser Add', data: voteduser});
        }
    });
});

// update voter
router.put('./voteduser/:vodeduserid', (req, res, next) => {
    let updateVoted = {
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email
    };
    Voteduser.updateVoteduser(req.params.vodeduserid, updateVoted, (err, voteduser) => {
        if(err){
            res.json({success: false, msg: 'Failed to Update Voteduser'});
        }else{
            res.json({success: true, msg: 'Voteduser Update', data: voteduser});
        }
    });
});

// get voter
router.get('/voteduser', (req, res, next) => {
    Voteduser.find(function(err, voteduser){
        if(err) throw err;
        res.json({success: true, data: voteduser});
    });
});

router.delete('/voteduser/:vodeduserid', (req, res, next) => {
    Voteduser.deleteVoteduser(req.params.vodeduserid, (err, poll) => {
        if(err) throw err;
        res.json({success: true, msg: 'Voteduser deleted successfully'});
    });
});

module.exports = router;