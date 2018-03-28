const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const Contact = require('../models/contact');

router.get('/contacts', (req, res, next) => {
    Contact.find(function(err, contact){
        if(err) throw err;
        res.json({success: true, data: contact});
    });
});

router.get('/contactform/:type', (req, res, next) => {
    Contact.getContactByForm(req.params.type, (err, contact) => {
        if(err) throw err;
        res.json({success: true, data: contact});
    });
});


router.post('/contact', (req, res, next) => {
    let newContact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        organization: req.body.organization,
        email: req.body.email,
        message: req.body.message,
        understand: req.body.understand,
        store: req.body.store,
        type: req.body.type
    }); 
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Email: ${req.body.email}</li>
        <li>Organization: ${req.body.organization}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: 'jawahar@zolipe.com',
                clientId: '273772789152-n6pfj9mbs6688lg6e7i4a0r5pgq0684e.apps.googleusercontent.com',
                clientSecret: 'Mut-sGtm7sxI3kZvDJb4Uuzi',
                refreshToken: 'X/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
            })
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Jawahar" <foo@example.com>', // sender address
        to: 'jawahar@zolipe.com', // list of receivers
        subject: 'ContactForm-' + req.body.type, // Subject line
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    Contact.addContact(newContact, (err, category) => {
        if(err){
            res.json({success: false, msg: 'Failed to Send Message'});
        }else{

            res.json({success: true, msg: 'Your application has been submitted and we will get in touch shortly.', data: category});
        }
    });
});

router.delete('/contact/:contactid', (req, res, next) => {
    Contact.deleteContact(req.params.contactid, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to delete Contact'});
        }else{
            Contact.find(function(err, contact){
                if(err) throw err;
                res.json({success: true, msg: 'Contact deleted successfully', data: contact});
            });
        }
    });
});

module.exports = router; 