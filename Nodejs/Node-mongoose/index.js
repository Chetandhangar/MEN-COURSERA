const mongoose = require('mongoose');
const  Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const  connect = mongoose.connect(url);

connect.then((db)=>{
    console.log("Connected correctly to the server ");

    Dishes.create({
        name: "uthappizza",
        description:"test"
    })
    .then((dish)=>{
        console.log(dish.toJSON());

        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{description: "updated test"}
        },{
            new:true
        }).
        exec();
    })
    .then((dish)=>{
        console.log(dish.toJSON());

        dish.comments.push({
            rating : 5,
            comment: 'I\'m getting  a sinking feeling!',
            author: 'Cristiano Ronaldo'
        });

        return dish.save({});
    })
    .then((dish)=>{
        console.log(dish.toJSON());
        return Dishes.remove();
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
    });
})