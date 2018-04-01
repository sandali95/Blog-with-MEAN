const express = require('express');
const jwt = require ('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

const router = express.Router();

router.post('/register' , (req,res)=>{
    let newUser = new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    });

    User.addUser(newUser , (err,user)=>{
        if(err){
            res.json({success:false , msg : 'Failed to register'});
        }else{
            res.json({success:true , msg : 'Successfully registered'});
        }
    });
});

router.post('/authenticate' , (req,res)=>{
    let username = req.body.username;
    let password = req.body.password;

    User.getUserByUsername( username , (err,user)=>{
        if(err) throw err;

        if(!user){
           return (res.json({success:false , msg:'User not found'}));
        }

        User.comparePassword(password , user.password ,(err,isMatch)=>{
            if(err) throw err;

            if(isMatch){
                const token = jwt.sign(user.toJSON(),config.secret,{
                    expiresIn:604800 //1 week
                });

                res.json({
                    success:true,
                    token:'Bearer '+token,
                    user:{
                      id:user._id,
                      name:user.name,
                      username:user.username,
                    }
                });

            }else{
                return (res.json({success:false , msg:'Invalid Password'}));
            }
        });
    });
});


//Profile
router.get('/profile',verifyToken,function(req,res,next){
    jwt.verify(req.token, config.secret, (err, authData) => {
      if(err) {
        console.log(err);
        res.sendStatus(403);
      } else {
        res.json({
          message: 'Authorized',
          authData
        });
      }
    });
});

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
}
module.exports = router;