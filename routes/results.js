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
        votedto: req.body.votedto,
        state: req.body.state,
        region: req.body.region
    });
    Result.addResult(newResult, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to add Result'});
        }else{
            Result.getResult(req.body.pollid, (err, poll) => {
                if(err) throw err;
                res.json({success: true, msg: 'Result', data: poll});
            });
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

function percentage(num, tot)
{
  return parseInt((num/tot)*100);
}


router.get('/getresult/:pollid', (req, res, next) => {
    Result.getResult(req.params.pollid, (err, poll) => {
        if(err) throw err;
        Array.prototype.sum = function (prop) {
          var total = 0
          for ( var i = 0, _len = this.length; i < _len; i++ ) {
              total += this[i][prop]
          }
          return total;
        }
        if(poll.length == 0){
          res.json({success: true, msg: 'Result', data: poll});
        }
        var totpoll = poll.sum("voteCount");
        for(var i=0; i<poll.length; i++) {
          poll[i].percent = percentage(poll[i].voteCount, totpoll);
          if(i == poll.length-1){
            res.json({success: true, msg: 'Result', data: poll});
          }
        }


    });
});

router.get('/getoptionresult/:pollid', (req, res, next) => {
    Result.getOptionResult(req.params.pollid, (err, poll) => {
        if(err) throw err;
        res.json({success: true, msg: 'Result', data: poll});
    });
});

router.get('/getoptionresultregion/:pollid/:state', (req, res, next) => {
    Result.getOptionResultState(req.params.pollid, req.params.state, (err, poll) => {
        if(err) throw err;
        res.json({success: true, msg: 'Result', data: poll});
    });
});

router.get('/getpreviouspolls/:mobile', (req, res, next) => {
    Result.getPreviousPolls(req.params.mobile, (err, poll) => {
        if(err) throw err;
        res.json({success: true, msg: 'Result', data: poll});
    });
});

router.get('/getuserpolls/:pollid', (req, res, next) => {
    Result.getUserPolls(req.params.pollid, (err, poll) => {
        if(err) throw err;
        res.json({success: true, msg: 'Result', data: poll});
    });
});
module.exports = router;
