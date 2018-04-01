const express = require ('express');
const cors = require ('cors');
const mongoose = require ('mongoose');
const bodyparser =require('body-parser');


const app = express();

const users = require('./routes/users');
const posts = require('./routes/posts');
const config = require('./config/database');

//Database connection
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected',function(){
  console.log('Connected to database : '+config.database);
});
mongoose.connection.on('error',function(err){
  console.log('Database Error : '+err);
});

//static front end files
app.use(express.static('./public'));

//port number
const port = 3000;

//CORS Middleware
app.use(cors());

//Body-Parser Middleware
app.use(bodyparser.json());

//index routes
app.get('/',function(req,res,next){
    res.send('Invali');
});

//User Routes
app.use('/users',users);

//Post Routes
app.use('/posts',posts);

//Server
app.listen(port , ()=>{
    console.log('Listening from port 3000 ...')
});
