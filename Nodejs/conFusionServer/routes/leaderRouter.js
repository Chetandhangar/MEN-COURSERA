const express = require('express');
const bodyParser= require('body-parser');

const leaderRouter=express.Router();


leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('will get all the leaders');
})
.post((req,res,next)=>{
    res.end('will add the leader: ' + req.body.name + 'with details:' + req.body.description);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT is not supported on /leaders');
})
.delete((req,res,next)=>{
    res.end('will delete all the leaders');
});

leaderRouter.route('/:leaderId')
.get((req,res,next)=>{
    res.end('will get the :' + req.params.leaderId + 'tp you!');
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('Post is not supported: ' + req.params.leaderId);
})
.put((req,res,next)=>{
    res.write('Updating an leader :' + req.params.leaderId + '\n');
    res.end('will updating the /leader : ' + req.body.name + 'with details: '+ req.body.description);
})
.delete((req,res,next)=>{
    res.end('will delete leader: '+ req.params.leaderId);
});

module.exports=leaderRouter;