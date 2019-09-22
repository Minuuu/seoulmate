var express = require('express');
var router = express.Router();

const request = require('request');
const allkey = require('../../config/api_key.json')
const apiKey = allkey.key;

router.get('/', function(req, res) {
   	let lang = req.query.lang;
	let stationID = req.query.stationID;
	const option = {
		uri: "https://api.odsay.com/v1/api/subwayStationInfo?",
		qs:{
			lang:lang,
			stationID:stationID,
			apiKey:apiKey
		}
	}

	request(option,function(err,response,body){
		if(err) throw err;
		//console.log(res);
		var data = JSON.parse(body);
        console.log(data);
        if(data.result==undefined){
            return res.json({"status":500,"msg":"ERROR"});
        }
		res.json(data.result);
		console.log('body',data.result);
	});
	
});

module.exports = router;