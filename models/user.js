const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const Poll = require('./poll');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    superadmin: {
        type: Number,
        default: 0
    },
    polls : [{ 
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'Poll' 
    }],
    createdon: {
        type: Date,
        default: Date.now
    },
    updatedon: {
        type: Date,
        default: Date.now
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByMobile = function(mobile, callback){
    const query = {
        mobile: mobile
    }
    User.findOne(query, callback);
};

module.exports.getAllUser = function(callback){
    const query = {
        superadmin: 0
    }
    User.find(query, callback);
};

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash; 
            newUser.save(callback);
        });
    });
};

module.exports.deleteUser = function(uid, callback){
    User.remove({_id: uid}, callback);
} ;

module.exports.updateUser = function(uid, updatedProduct, callback){ 
    User.update({_id: uid},updatedProduct, callback);
} ;

module.exports.ComparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
};

module.exports.updateUserPassword = function(uid, updatedProduct, callback){ 
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(updatedProduct.password, salt, (err, hash) => {
            if(err) throw err;
            updatedProduct.password = hash; 
            User.update({_id: uid},updatedProduct, callback);
        });
    });
} ;