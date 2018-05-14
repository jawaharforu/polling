const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const User = require('../models/user');

// Get all user
router.get('/users', (req, res, next) => {
    User.getAllUser((err, user) => {
        if(err) throw err;
        res.json({success: true, data: user});
    });
});

router.get('/votedusers', (req, res, next) => {
    User.getAllVotedUser((err, user) => {
        if(err) throw err;
        res.json({success: true, data: user});
    });
});

// Registration
router.post('/register', (req, res, next) => {
    //res.send('registration');
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        role: req.body.role,
        status: true
    });
    User.getUserByMobileCheck(req.body.mobile, req.body.email, (err, users) => { 
        if(err) throw err;
        if(users){
            return res.json({success:false, msg: "User mobile or email aleady exist"});
        }
        User.addUser(newUser, (err, user) => {
            if(err){
                res.json({success: false, msg: 'Falied to register new user'});
            }else{
                res.json({success: true, msg: 'User registred'});
            }
        });
    }); 
});

router.post('/adminregister', (req, res, next) => {
    //res.send('registration');
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        role: 'admin',
        superadmin: 1
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Falied to register new user'});
        }else{
            res.json({success: true, msg: 'User registred'});
        }
    });
});

// Authendicate
router.post('/authendicate', (req, res, next) => {
    //res.send('authendicate');
    const mobile = req.body.mobile;
    const password = req.body.password;

    User.getUserByMobile(mobile, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success:false, msg: "User not found"});
        }

        User.ComparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                //console.log(user);
                let userDetail = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: user.role
                };
                const token = jwt.sign(userDetail, config.secret, { 
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        mobile: user.mobile,
                        role: user.role
                    }
                });
            }else{
                return res.json({success:false, msg: "Password not match"});
            }
        });
    });
});
// Delete user
router.delete('/user/:uid', (req, res, next) => {
    User.deleteUser(req.params.uid, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to delete Product'});
        }else{
            res.json({success: true, msg: 'Product deleted successfully'});
        }
    });
});
// Update product
router.put('/user/:uid', (req, res, next) => {
    let updatedUser = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        role: req.body.role,
        status: req.body.status
    };
    User.updateUser(req.params.uid, updatedUser, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to Update User'});
        }else{
            User.getAllUser((err, user) => {
                if(err) throw err;
                res.json({success: true, msg: 'User Updated successfully', data: user});
            });
        }
    });
});
// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    //res.send('profile');
    res.json({user: req.user}); 
});
/*
router.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user);
    }
);
*/
router.get('/users/:uid', (req, res, next) => {
    User.getUserById(req.params.uid, (err, user) => {
        if(err) throw err;
        res.json({success: true, data: user});
    });
});
router.put('/userassign/:uid', (req, res, next) => {
    let updatedUser = {
        polls: req.body.polls
    };
    User.updateUser(req.params.uid, updatedUser, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to Assign Poll'});
        }else{
            res.json({success: true, msg: 'Poll Assigned successfully'});
        }
    });
});

router.post('/passwordcheck', (req, res, next) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.oldpassword, salt, (err, hash) => {
            if(err) throw err;
            console.log(req.body);
            User.ComparePassword(req.body.newpassword, hash, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    return res.json({success:true, msg: "Password matched"});
                }else{
                    return res.json({success:false, msg: "Password not match"});
                }
            });
        });
    });
    
});
router.put('/userpassword/:uid', (req, res, next) => {
    let updatedUser = {
        password: req.body.password
    };
    User.updateUserPassword(req.params.uid, updatedUser, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to Update Your Password'});
        }else{
            res.json({success: true, msg: 'Updated Your Password'});
        }
    });
});

router.get('/userpoll/:uid', (req, res, next) => {
    User.getUserWithPoll(req.params.uid, (err, user) => {
        if(err) throw err;
        res.json({success: true, data: user});
    });
});

router.post('/forgotpass', (req, res, next) => {
    User.getUserByEmailCheck(req.body.email, (err, users) => {
        if(err) throw err;
        if(users){
            let pass = 'P' + Math.floor(Math.random() * 11111) + 1111;
            let updatedUser = {
                password: pass
            };
            User.updateUserPassword(users._id, updatedUser, (err, result) => {
                if(err){
                    res.json({success: false, msg: 'Failed to Reset Your Password'});
                }else{
                    const output = `
                        <p>Your Nationpulse password has been reseted</p>
                        <ul>  
                        <li>You New Password: ${pass}</li>
                        </ul>
                    `;
                    const transport = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: 'nationpulseweb@gmail.com',
                            pass: '%$t2DFS6#k$',
                        },
                    });

                    // setup email data with unicode symbols
                    const mailOptions = {
                        from: 'nationpulseweb@gmail.com',
                        to: req.body.email,
                        subject: 'NationPulse Password Reset',
                        html: output,
                    };

                    // send mail with defined transport object
                    transport.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        return res.json({success:false, msg: 'Your Password has been reseted, Please check your email and Login again'});
                    });
                    
                }
            });
        } else {
            return res.json({success:false, msg: "User email not exist"});
        }
    });
});
module.exports = router;