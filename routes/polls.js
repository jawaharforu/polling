const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Poll = require('../models/poll');
const request = require('request');
const multer = require('multer');
var xlsx = require('node-xlsx');

// Get polls
router.get('/polls', (req, res, next) => {
    Poll.getAllPolls((err, poll) => {
        if(err) throw err;
        res.json({success: true, data: poll});
    });
});

// get poll by id
router.get('/poll/:pollid', (req, res, next) => {
    Poll.getPollById(req.params.pollid, (err, poll) => {
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
        options: req.body.options,
        trending: req.body.trending,
        home: req.body.home,
        fromdate: req.body.fromdate,
        todate: req.body.todate,
        image: req.body.image,
        result: false
    }); 
    Poll.addPoll(newPoll, (err, poll) => {
        if(err){
            res.json({success: false, msg: 'Failed to add Poll'});
        }else{
            res.json({success: true, msg: 'Poll Add', data: poll});
        }
    });
});

router.put('/poll/:pollid', (req, res, next) => {
    let updatePoll = {
        name: req.body.name,
        type: req.body.type,
        status: req.body.status,
        categoryid: req.body.categoryid,
        options: req.body.options,
        trending: req.body.trending,
        home: req.body.home,
        fromdate: req.body.fromdate,
        todate: req.body.todate,
        image: req.body.image,
        result: req.body.result
    };
    Poll.updatePoll(req.params.pollid, updatePoll, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to Update Poll'});
        }else{
            Poll.getAllPolls((err, poll) => {
                if(err) throw err;
                res.json({success: true, msg: 'Poll Updated successfully', data: poll});
            });
        }
    });
});

router.delete('/poll/:pollid', (req, res, next) => {
    Poll.deletePoll(req.params.pollid, (err, poll) => {
        if(err) throw err;
        Poll.getAllPolls((err, poll) => {
            if(err) throw err;
            res.json({success: true, msg: 'Poll deleted successfully', data: poll});
        });
    });
});

// By status
router.get('/pollstatus', (req, res, next) => {
    Poll.getPollByStatus( (err, poll) => {
        if(err) throw err;
        res.json({success: true, data: poll});
    });
});

router.get('/pollstatushome', (req, res, next) => {
    Poll.getPollByStatusHome( (err, poll) => {
        if(err) throw err;
        res.json({success: true, data: poll});
    });
});

router.get('/pollcategory/:categoryid', (req, res, next) => {
    Poll.getPollByCategory(req.params.categoryid, (err, poll1) => {
        if(err) throw err;
        Poll.getPollByCategoryFalse(req.params.categoryid, (err, poll2) => {
            if(err) throw err;
            res.json({success: true, data: {trending: poll1, others: poll2}}); 
        });
    }); 
});

router.get('/pollstatusresult', (req, res, next) => {
    Poll.getPollByResult( (err, poll) => {
        if(err) throw err;
        res.json({success: true, data: poll});
    });
});

router.get('/ipdetail/:ip', (req, res) => {
    request('https://api.ip2location.com/?ip=' + req.params.ip + '&key=0FF79BE7E0&package=WS3', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(body);
        res.json({success: true, data: body});
      } else {
        res.json({success: true, data: 'IN;India;Karnataka;Bangalore'});
      }
    });
});

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');
/** API path that will upload the files */

router.post('/upload', function(req, res) {
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        var obj = xlsx.parse(req.file.path); // parses a file
        var data = obj[0].data;
        for(var i = 0; i < data.length; i++) {
            if(data[i]) {
                var name = data[i][0];
                var options = data[i].splice(0, 1);
                let newPoll = new Poll({
                    name: name,
                    type: 'Single',
                    status: true,
                    categoryid: '5ae020b66bcade45dee12e33',
                    options: options,
                    trending: true,
                    home: false,
                    image: '',
                    result: true
                }); 
                Poll.addPoll(newPoll, (err, poll) => {
                    if(err){
                        //res.json({success: false, msg: 'Failed to add Poll'});
                        console.log('error '+i);
                    }else{
                        //res.json({success: true, msg: 'Poll Add', data: poll});
                        console.log('success '+i);
                    }
                });
            }
        } 
        //res.json({error_code:obj});
        //res.json({error_code:0,err_desc:null});
    });
});



module.exports = router;