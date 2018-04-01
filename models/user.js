const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const database = require('../config/database');


//User Schema
const UserSchema = mongoose.Schema({
    name: {
        type:String
      },
      email : {
        type : String,
        required : true
      },
      username : {
        type : String,
        required : true
      },
      password : {
        type : String,
        required : true
      }    
});

const User = module.exports = mongoose.model('user',UserSchema);

module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        if(err) throw err;
        bcrypt.hash(newUser.password,salt,(err , hash)=>{
            newUser.password = hash;
            newUser.save(callback);
        });
    });  
}

module.exports.getUserById = function(id , callback){
    User.findById(id,callback);
}

module.exports.getUserByUsername = function(username , callback){
    let query = {username:username};
    User.findOne(query,callback);
}

module.exports.comparePassword = function(candidatePassword , hash ,callback){
    bcrypt.compare(candidatePassword, hash, function(err,isMatch){
      if(err) throw err;
      callback(null,isMatch);
    });
  }
  