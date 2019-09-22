var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var {PythonShell} = require('python-shell');
var MongoClient = require('mongodb').MongoClient;

const util = require('util');
const allkey = require('../../config/api_key.json')
const apiKey = allkey.key;
const mapKey = allkey.mapKey;
const googleMaps = require('@google/maps');
const googleMapsClient = googleMaps.createClient({
    key:mapKey,
});

let dir_name = '/Users/minwoo/dev/2019project/mate/landmark_recognition/'
/* GET home page. */
router.get('/', function(req, res) {
   // let image = req.body.image;

    let options = {
        mode:'text',
        args:['data/images/63building0.jpg']
    }
    //var path = window.location.pathname;
    PythonShell.run(dir_name+'landmark_recognition.py', options, function(err, results) {

        if (err) throw err;


        console.log('results: ', results);
      

    });
    
});
//router.post('/', upload.single('image'), function(req, res) {
router.post('/', function(req, res) {
    //console.log(req.file);

    let options = {
        mode: 'text',
        args: [dir_name+'data/images/63building0.jpg']
    }
    console.log(dir_name+'data/images/63building0.jpg');
    PythonShell.run(dir_name+'landmark_recognition.py', options, async function(err, results) {

        if (err) throw err;
        console.log('results: ', results);
        const googlePlaces = util.promisify(googleMapsClient.places);
        try {

            const response = await googlePlaces({
                query: results[0],
                language: 'ko',
            });
            return res.json({
                    title: `${results[0]} 검색 결과`,
                    results: response.json.results,
                    query: req.query.place,
                });
        } catch (error) {
            console.error(error);
            res.json({"status":500,"msg":"ERROR"});
            throw error;
        }
    });
});

module.exports = router;
