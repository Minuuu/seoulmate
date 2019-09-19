var express = require('express');
var router = express.Router();
var multer = require('multer');
var {PythonShell} = require('python-shell');

var MongoClient = require('mongodb').MongoClient;
var promise = function(db){
	return new Promise(function(resolve,reject){
		var q = {'id':"ssu1"};
		console.log('1');
		db.collection('user').find(q).toArray(function(err,result){
			if(err) throw err;
			console.log(result.length);
			resolve();
		})
	})
}


/* GET home page. */
router.post('/', function(req, res) {
	let image = req.body.image;

	let options = {
		mode:'text',
		args:[image]
	}

    PythonShell.run('deep.py', options, function(err, results) {

        if (err) throw err;


        console.log('results: ', results);
        /*
        API 정해서 호출하면됨.
        */

    });
});

module.exports = router;
