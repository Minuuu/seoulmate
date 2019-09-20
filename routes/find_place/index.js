var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const request = require('request');
const apiKey = require('../../config/api_key.json').key;
console.log(apiKey)
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

router.get('/', function(req, res) {
	//var id = req.query.id;

	/*
	위치 찾는 기능 넣자.
	Using request module 
	*/
	let url = "https://api.odsay.com/v1/api/searchPubTransPathR?"
	let lang = req.query.lang;
	let sx = req.query.SX;
	let sy = req.query.SY;
	let ex = req.query.EX;
	let ey = req.query.EY;
	console.log(lang,sx,sy,ex,ey);
	const option = {
		uri: "https://api.odsay.com/v1/api/searchPubTransPathR?",
		qs:{
			lang:lang,
			SX:sx,
			SY:sy,
			EX:ex,
			EY:ey,
			apiKey:apiKey
		}
	}

	request(option,function(err,response,body){
		if(err) throw err;
		//console.log(res);
		var data = JSON.parse(body);
		res.json(data.result.path);
		console.log('body',data.result.path);
	})

	/*

	MongoClient.connect('mongodb://localhost:27017/test',{useNewUrlParser:true,useUnifiedTopology: true},function(err,db){
		if(err) throw err;
		mydb = db.db('test');
		mydb.collection('recent_search').insertOne(q).toArray(function(err,res){
			if(err) throw err;
			console.log(res);
		})

	});
	*/
});

module.exports = router;
