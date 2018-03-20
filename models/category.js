const mongoose = require('mongoose');
const config = require('../config/database');

// Category schema

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    content: {
        type: String
    },
    status: {
        type: Boolean
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    keywords: {
        type: String
    },
    slug: {
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

const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.addCategory = function(newCategory, callback){
    newCategory.save(callback);
};

module.exports.getCategoryById = function(categoryid, callback){
    Category.findById(categoryid, callback);
};

module.exports.getCategoryByName = function(slug, callback){
    const query = {
        slug: slug
    }
    Category.findOne(query, callback);
};

module.exports.getCategoryByStatus = function(callback){
    const query = {
        status: true
    }
    Category.find(query, callback);
};

module.exports.deleteCategory = function(categoryid, callback){
    Category.remove({_id: categoryid}, callback);
} ;

module.exports.updateCategory = function(categoryid, updatedCategory, callback){
    Category.update({_id: categoryid},updatedCategory, callback);
} ;