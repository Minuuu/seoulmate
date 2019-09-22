var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.get('/', function(req, res) {
	var id = req.query.id;
	console.log(id);
	MongoClient.connect('mongodb://localhost:27017/test',{useNewUrlParser:true,useUnifiedTopology: true},function(err,db){
		if(err) throw err;
		mydb = db.db('test');
		var q = {'id':id};
		console.log(id);
		mydb.collection('recent_search').find(q).toArray(function(err,result){
			if(err) throw err;
			
			if(result.length==0)
				res.json({"status":200,"msg":"NOT_THING"});
			else
				res.json({"status":200, "msg":"OK", "result":result});
		})

	});
});

module.exports = router;
