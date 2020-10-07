const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client)=>{
    assert.equal(err,null);

    console.log('Connected correctly to the server');

    const db = client.db(dbname);
     dboper.insertDocument(db,{name:"Vadnout",description:"test"},"dishes",(result)=>{
        console.log("Insert Document:\n", result.ops);

        dboper.findDocument(db,"dishes",(docs)=>{
            console.log("Found Document:\n",docs);

            dboper.updateDocument(db, { name: "Vadnout"} , 
            { description: "updated test"}, "dishes",(result)=>{
                console.log("Updated Document:\n",result.result);

                dboper.findDocument(db,"dishes",(docs)=>{
                    console.log("Found updated Document:\n",docs);

                    db.dropCollection("dishes",(result)=>{
                        console.log("Drop Collection",result);

                        client.close();
                    });
                });
            });
        });
    });
});