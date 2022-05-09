const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE SCHEMA (STRUCTURE)
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true}); // auto-assign properties to the object such as date created and edited

// CREATE MODEL BASED ON SCHEMA
const Blog = mongoose.model('Blog', blogSchema) 
// argument 1: the collection in the database we're using (should be the singular version of the collection name)
// argument 2: the schema we're basing the model on; the types of objects we want to store in this model 

// export model
module.exports = Blog;