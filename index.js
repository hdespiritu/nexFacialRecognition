var express = require('express');
var app = express();

var config = require('./config.js')

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });

var AWS = require('aws-sdk');
AWS.config.region = config.region;

apiConfig = {}
apiConfig.collectionName = config.collectionName;
apiConfig.region = config.region;
apiConfig.accessKeyId = config.accessKeyId;
apiConfig.secretAccessKey = config.secretAccessKey;
apiConfig.apiVersion = config.apiVersion;

var uuid = require('node-uuid');
var fs = require('fs-extra');
var path = require('path');

app.use(express.static('public'));

var rekognition = new AWS.Rekognition(apiConfig);//{region: config.region});

app.post('/api/recognize', upload.single("image"), function (req, res, next) {
	//var bitmap = req;
	//var bitmap = new Image();
	//fs.writeFile('photoCapture.jpg', req, )
	//Buffer.from(base64Buffer.toString(), 'base64')
	//var bitmap = //new Buffer.from(req.toString(),'base64');//
	var bitmap = fs.readFileSync(req.file.path);
	//console.log(bitmap);

	rekognition.searchFacesByImage({
	 	"CollectionId": config.collectionName,
	 	"FaceMatchThreshold": 70,
	 	"Image": { 
	 		"Bytes": bitmap,
	 	},
	 	"MaxFaces": 1
	}, function(err, data) {
	 	if (err) {
	 		res.send(err);
	 	} else {
			if(data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Face)
			{
				res.send('Successful Match!\n\n' + data.FaceMatches[0].Face);	
			} else {
				res.send("Not recognized");
			}
		}
	});
});

app.listen(5555, function () {
	console.log('Listening on port 5555!');
})