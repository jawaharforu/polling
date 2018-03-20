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
    let slugtitle = req.body.name;
    let newCategory = new Category({
        name: req.body.name,
        content: req.body.content,
        status: false,
        title: req.body.title,
        description: req.body.description,
        keywords: req.body.keywords,
        slug: slugtitle.split(' ').join('_').toLowerCase()
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
    let slugtitle = req.body.name;
    let updatedCategory = {
        name: req.body.name,
        status: req.body.status,
        content: req.body.content,
        title: req.body.title,
        description: req.body.description,
        keywords: req.body.keywords,
        slug: slugtitle.split(' ').join('_').toLowerCase()
    }; 
    Category.updateCategory(req.params.categoryid, updatedCategory, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to Update Category'});
        }else{
            Category.find(function(err, category){
                if(err) throw err;
                res.json({success: true, msg: 'Category Updated successfully', data: category});
            });
        }
    });
});

router.get('/categoriesstatus', (req, res, next) => {
    Category.getCategoryByStatus((err, category) => {
        if(err) throw err;
        res.json({success: true, data: category});
    });
});

router.get('/categoriesslug/:slug', (req, res, next) => {
    Category.getCategoryByName(req.params.slug, (err, category) => {
        if(err) throw err;
        res.json({success: true, data: category});
    });
});

module.exports = router; 