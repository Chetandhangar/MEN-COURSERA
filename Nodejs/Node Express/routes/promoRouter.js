const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('will get all the promotions');
})
.post((req,res,next)=>{
    res.end('will add the promo : '+ req.body.name + 'with details :' + req.body.description);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT opertation in not supported /promotions ');
})
.delete((req,res,next)=>{
    res.end('will delete all the promotions');
});

promoRouter.route('/:promoId')
.get((req,res,next)=>{
  res.end('Will send details of the dish: ' + req.params.promoId +' to you!');
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('Post Operation is not supported on /dishes'+ req.params.promoId);
})
.put((req,res,next)=>{
    res.write('Updating an dish '+ req.params.promoId + '\n');
    //res.end('will update the dish :'+ req.params.name + 'with details :' + req,params.description);
    res.end('Will update the dish: ' + req.body.name + 
    ' with details: ' + req.body.description); 
  })
.delete((req,res,next)=>{
    res.end('will delete the dish: '+ req.params.promoId);
});

module.exports=promoRouter;