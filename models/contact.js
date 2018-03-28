const mongoose = require('mongoose');
const config = require('../config/database');

const ContactSchema = mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    organization: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
    understand: {
        type: Boolean
    },
    store: {
        type: Boolean
    },
    type: {
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

const Contact = module.exports = mongoose.model('Contact', ContactSchema);

module.exports.addContact = function(newContact, callback){
    newContact.save(callback);
};

module.exports.deleteContact = function(contactid, callback){
    Contact.remove({_id: contactid}, callback);
};

module.exports.getContactByForm = function(type, callback){
    const query = {
        type: type
    }
    Contact.find(query, callback);
};