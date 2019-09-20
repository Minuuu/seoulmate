var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;


var find_id = function(db,data){
	return new Promise(function(resolve,reject){
		console.log(data);
		var q = {'id':data.id};
		db.collection('user').find(q).toArray(function(err,result){
			if(err) throw err;
			console.log(result);
			if(result.length != 0)
				res.json({"status":500,"msg":"DUPLICATE"});
			else{
				console.log('data: ',data);
				var msg = {
					"db":db,
					"data":data
				}
				resolve(msg);
			}
		})
	})
}
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



/* GET home page. */
router.post('/', function(req, res) {
	let id = req.id;
	let pw = req.pw;
	MongoClient.connect('mongodb://localhost:27017/test',{useNewUrlParser:true,useUnifiedTopology: true},function(err,db){
		if(err) throw err;
		var q = {'id':"33",'pw':"22"};
		mydb = db.db('test');
		find_id(mydb,q)
		.then(insert_id)
		.catch(function(err){
			console.log('err:',err);
		})
	});
});

module.exports = router;
