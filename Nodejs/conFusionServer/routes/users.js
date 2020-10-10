var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const User = require('../models/user');

router.use(bodyParser.json());



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',(req,res,next)=>{
  User.findOne({username:req.body.username})
  .then((user)=>{
    if(user != null){
      var err = new Error("User "+ req.body.username+ "already exist!");
      err.status=403;
      next(err)
    }
    else{
       return User.create({
         username:req.body.username,
         password:req.body.password
       });
    }
  })
  .then((user)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({status: 'Registration Successful!', user:user});
  },(err)=>next(err))
  .catch((err)=>next(err));
})

router.post('/login',(req,res,next)=>{
  if(!req.session.user) {

    var authHeader = req.headers.authorization;   //stores req.header.atuhorization info in authheader
    if(!authHeader){                                      //if autentication didint provide in req.header
      var err = new Error('You are not authoniticated!');
      res.setHeader('WWW-Authenticate','Basic');
      err.status =401;
       return next(err);
      
    }
    //if req.header contains authentication
    var auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];
 
      User.findOne({username:username})
      .then((user)=>{
        if(user === null){
          var err = new Error('User'+ req.bosy.username + "not exist!");
          err.status=403;
          return next(err);
        }
        else if(user.password != password){
          var err = new Error('Your password is incorrect');
          err.status=403;
          return next(err);
        }
        else if(user.username == username && user.password == password){
          req.session.user='authenticated';
          res.statusCode=200;
          res.setHeader('Content-Type','plain/text');
          res.end("You are authenticated");
        }
      })
      .catch((err)=>next(err));
    }
    else{
      res.statusCode=401;
      res.setHeader('Content-Type','plain/text');
      res.end('You are already authenticated');
    }
})

router.get('/logout',(req,res,next)=>{
   if(req.session){
     req.session.destroy();
     res.clearCookie();
     res.redirect('/');
   }
   else{
     var err = new Error("You are not logged in!");
     err.status=403;
     next(err);
   }
});

module.exports = router;
