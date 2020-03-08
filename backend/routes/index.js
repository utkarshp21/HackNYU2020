var express = require('express');
var router = express.Router();


var fs = require('fs');
const ImageDataURI = require('image-data-uri');

const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  authenticator: new IamAuthenticator({
    apikey: 'TQKb-_7JqOkjdqjoQ5GlOf8CvqzKc2Zisl0i8NlppeKw',
  }),
  url: 'https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/64cbcb1c-08da-41dc-a23b-2911b436c565',
});


router.post('/post_image', function (req, res, next) {
  var dataUrl = req.body.img;
  
  const fileName = 'decoded-image.png';

  ImageDataURI.outputFile(dataUrl, fileName).then(()=>{
    const classifyParams = {
      imagesFile: fs.createReadStream('/Users/aviator/Desktop/hackNYU/backend/decoded-image.png'),
      owners: ['me'],
      threshold: 0.6,
    };

    visualRecognition.classify(classifyParams)
      .then(response => {
        const classifiedImages = response.result;
        console.log(JSON.stringify(classifiedImages, null, 2));
        res.send(classifiedImages);
      })
      .catch(err => {
        console.log('error:', err);
      });
  });

});

module.exports = router;
