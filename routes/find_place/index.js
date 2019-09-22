var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
const util = require('util');

const request = require('request');
const allkey = require('../../config/api_key.json')
const apiKey = allkey.key;
const mapKey = allkey.mapKey;
const googleMaps = require('@google/maps');
const googleMapsClient = googleMaps.createClient({
	key:mapKey,
})


router.get('/autocomplete', (req, res, next) => {
	console.log(req.query);
	
    googleMapsClient.placesQueryAutoComplete({
        input: req.query.place,
        language: 'ko',
    }, (err, response) => {
        if (err) {
            return next(err);
        }
        console.log(response.json.predictions);
        let msg = {
        	"status":200,
        	"msg":"OK",
        	"data":[]
        }
        
        for(let i = 0; i<3;i++){
        	console.log(i);
        	let data = response.json.predictions[i];
        	let tmp = data.structured_formatting;
        	//console.log(tmp);
       		msg.data.push({
       			"description":data.description,
       			"place":tmp.main_text,
       			"address":tmp.secondary_text
       		});
       	}
        return res.send("\'" + JSON.stringify(msg) + "\'");
    });
});

router.get('/search', async(req, res, next) => {
    const googlePlaces = util.promisify(googleMapsClient.places);
    console.log(req.query.place);
    console.log(req.query.id);
    try {
        const response = await googlePlaces({
            query: req.query.place,
            language: 'ko',
        });
        var msg = {
            title: `${req.query.place} 검색 결과`,
            results: response.json.results,
            query: req.query.place
        }
        return res.send("\'" + JSON.stringify(msg) + "\'");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/', function(req, res) {
    /*
    MongoClient.connect('mongodb://localhost:27017/test',{useNewUrlParser:true,useUnifiedTopology: true},function(err,db){
        if(err) throw err;
        mydb = db.db('test');
         var q = {
                'id': req.query.id,
                'place': req.query.place
        };
        mydb.collection('recent_search').insertOne(q).toArray(function(err,res){
            if(err) throw err;
            console.log(res);
        })

    });
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
	});
	
});

module.exports = router;
