const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Category = require('../models/category');

// Get category
router.get('/categories', (req, res, next) => {
    Category.find(function(err, category){
        if(err) throw err;
        res.json({success: true, data: category});
    });
});
// Add category
router.post('/category', (req, res, next) => {
    let newCategory = new Category({
        name: req.body.name 
    }); 
    Category.addCategory(newCategory, (err, category) => {
        if(err){
            res.json({success: false, msg: 'Failed to add Category'});
        }else{
            res.json({success: true, msg: 'Category Add', data: category});
        }
    });
});
// Delete category
router.delete('/category/:categoryid', (req, res, next) => {
    Category.deleteCategory(req.params.categoryid, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to delete Category'});
        }else{
            Category.find(function(err, category){
                if(err) throw err;
                res.json({success: true, msg: 'Category deleted successfully', data: category});
            });
            
        }
    });
});
// Update category
router.put('/category/:categoryid', (req, res, next) => {
    let updatedCategory = {
        name: req.body.name
    }; 
    Category.updateCategory(req.params.categoryid, updatedCategory, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to Update Category'});
        }else{
            res.json({success: true, msg: 'Category Updated successfully'});
        }
    });
});

module.exports = router;