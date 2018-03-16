const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

// Get all user
router.get('/users', (req, res, next) => {
    User.find(function(err, user){
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
        role: req.body.role
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
        password: req.body.password,
        role: req.body.role
    };
    User.updateUser(req.params.uid, updatedUser, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to Update Product'});
        }else{
            res.json({success: true, msg: 'Product Updated successfully'});
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
module.exports = router;