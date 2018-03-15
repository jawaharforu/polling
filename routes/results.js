const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Result = require('../models/result');

// add voter
router.post('/result', (req, res, next) => {
    let newResult = new Result({
        pollid: req.body.pollid,
        voteduserid: req.body.voteduserid,
        votedto: req.body.votedto
    });
    Result.addResult(newResult, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to add Result'});
        }else{
            res.json({success: true, msg: 'Result Add', data: result});
        }
    });
});

// update voter
router.put('./result/:resultid', (req, res, next) => {
    let updateResult = {
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email
    };
    Result.updateResult(req.params.resultid, updateResult, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to Update Result'});
        }else{
            res.json({success: true, msg: 'Result Update', data: result});
        }
    });
});

// get voter
router.get('/result', (req, res, next) => {
    Result.find(function(err, result){
        if(err) throw err;
        res.json({success: true, data: result});
    });
});

router.delete('/result/:resultid', (req, res, next) => {
    Result.deleteResult(req.params.resultid, (err, poll) => {
        if(err) throw err;
        res.json({success: true, msg: 'Result deleted successfully'});
    });
});