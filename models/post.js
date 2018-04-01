const mongoose = require('mongoose');
const config = require('../config/database');

//Post Schema
const postSchema = mongoose.Schema({
    title :{
        type:String,
        required : true
    },
    content:{
        type:String,
        required : true
    },
    category:{
        type:String,
        required : true
    },
    author:{
        type:String,
        required : true
    },
    date:{
        type:Date,
        required : true
    }
});

const Post = module.exports = mongoose.model('post',postSchema);

module.exports.addPost = function(newPost,callback){
    newPost.save(callback);
}

module.exports.removePost = function(id , callback){
    Post.findByIdAndRemove(id,callback);
}

module.exports.updatePost = function(id,post,callback){
    let query = {
        title:post.title,
        content:post.content,
        category:post.category,
        author:post.category,
        date:post.date
    };
    Post.findByIdAndUpdate(id,query,callback);
}

module.exports.getAll = function(callback){
    Post.find(callback);
}