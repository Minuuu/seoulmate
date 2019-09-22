var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;


var find_id = function(db,data){
	return new Promise(function(resolve,reject){
		console.log(data);
		var q = {'id':data.id};
		db.collection('user').find(q).toArray(function(err,result){
			if(err) throw err;
			if(result.length != 0) reject();
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
    return new Promise(function(resolve, reject) {
        let db = msg.db;
        let data = msg.data;
        console.log(data);
        db.collection('user').insertOne(data, function(err, inserted) {
            if (err) throw err;
            console.log("Succecssful insert: ", JSON.stringify(inserted));
        })
    })
}

/* GET home page. */
router.post('/', function(req, res) {
	let id = req.id;
	let pw = req.pw;
	
	MongoClient.connect('mongodb://localhost:27017/test',{useNewUrlParser:true,useUnifiedTopology: true},function(err,db){
		if(err) throw err;
		var q = {'id':id,'pw':pw};
		mydb = db.db('test');
		find_id(mydb,q)
		.then(insert_id)
		.then(function(){
			 res.json({"status":500,"msg":"OK"});
		})
		.catch(function(err){
			res.json({"status":500,"msg":"DUPLICATE"});
			console.log('err:',err);
		})
	});
});

module.exports = router;
