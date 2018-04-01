const express = require('express');
const Post = require('../models/post');
const config = require('../config/database');

const router = express.Router();

router.post('/add',(req,res)=>{
    let newPost = new Post({
        title : req.body.title,
        content :req.body.content,
        category:req.body.category,
        author: req.body.author,
        date : req.body.date
    });

    Post.addPost(newPost,(err,post)=>{
        if(err){
            res.json({success:false , msg:"failed to post"});
        }else{
            res.json({success:true , msg :"successfully posted"});
        }
    });
});

router.get('/remove/:id',(req,res)=>{
    let id =req.params.id;
    Post.removePost(id,(err)=>{
        if(err) throw err;

        res.json({success:true , msg :"successfully removed the post"});
    });
});

router.post('/update/',(req,res)=>{
    let id =req.body.id;
    let post = req.body;
    
    Post.updatePost(id,post ,(err,post)=>{
        if(err) throw err;

        res.json({success:true , msg :"successfully updated the post"});
    });
});

//Get all posts
router.get('/blog',(req,res)=>{
    Post.getAll((err,data)=>{
        if(err) throw err;

        res.json(data);
    });
});




module.exports=router;