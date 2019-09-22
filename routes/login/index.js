var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.post('/', function(req, res) {
	let id = req.body.id;
	let pw = req.body.pw;
	MongoClient.connect('mongodb://localhost:27017/test',{useNewUrlParser:true,useUnifiedTopology: true},function(err,db){
		if(err) throw err;
		mydb = db.db('test');
		var q = {'id':id};
		mydb.collection('user').find(q).toArray(function(err,result){
			if(err) throw err;
			
			if(result.length==0)
				res.json({"status":200,"msg":"ERROR ID"});
			if(result[0].pw == pw)
				res.json({"status":200, "msg":"OK"});
			else
				res.json({"status":200, "msg":"ERROW PW"});
		})

	});
});

module.exports = router;
