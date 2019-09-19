var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var insert_id = function(msg) {
	let db = msg.db;
	let data = msg.data;
	//data["_id"] = 10;
	console.log(data);
	db.collection('user').insertOne(data, function(err, inserted) {
            if (err) throw err;
            console.log("Succecssful insert: ", JSON.stringify(inserted));
            res.json({"status":500,"msg":"OK"});
            /*
            CALL CLIENT
            */
    })
    
}

router.post('/', function(req, res) {
	//var id = req.query.id;

	/*
	위치 찾는 기능 넣자.
	Using request module 
	*/



	MongoClient.connect('mongodb://localhost:27017/test',{useNewUrlParser:true,useUnifiedTopology: true},function(err,db){
		if(err) throw err;
		mydb = db.db('test');
		mydb.collection('recent_search').insertOne(q).toArray(function(err,res){
			if(err) throw err;
			console.log(res);
		})

	});
});

module.exports = router;
