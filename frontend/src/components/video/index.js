import React from 'react';
import * as handTrack from 'handtrackjs';
const axios = require("axios");
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';


class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    model = null;
    
    runDetection() {
        const video = document.getElementById("webcam");
        let canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d")

        this.model.detect(video).then(predictions => {   
            
            if(predictions.length !== 0){
                // get the canvas context for drawing
                let screenshot_context = canvas.getContext('2d');

                // draw the video contents into the canvas x, y, width, height
                screenshot_context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // get the image data from the canvas object
                const dataURL = canvas.toDataURL();

                // set the source of the img tag
                const img = document.getElementById('thumbnail_img');
                img.setAttribute('src', dataURL);

                axios.post("http://localhost:3000/post_image", { "img": dataURL })
                    .then((response) => {
                        debugger;
                        console.log("The file is successfully uploaded");
                    }).catch((error) => {
                        debugger;
                    });
                
            }
            
            console.log("Predictions: ", predictions);
            this.model.renderPredictions(predictions, canvas, context, video);
            requestAnimationFrame(this.runDetection.bind(this));
        });
    }


    startVideo() {
        const video = document.getElementById("webcam");
        handTrack.startVideo(video).then(status => {
            console.log("video started", status);
            this.runDetection(video);
        });
    }

    componentDidMount() {
        // Load the model.
        const modelParams = {
            flipHorizontal: true,   // flip e.g for video  
            maxNumBoxes: 20,        // maximum number of boxes to detect
            iouThreshold: 0.5,      // ioU threshold for non-max suppression
            scoreThreshold: 0.6,    // confidence threshold for predictions.
        }
        handTrack.load(modelParams).then(lmodel => {
            this.model = lmodel
            this.startVideo();
        });
    }

    render() {
        return (
            
            <div>
                <div class container>
                <h1>Sign AI</h1>
                </div>
                <div class="row">

                <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Correct</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Incorrect</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">signs</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Total Score</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">signs</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            </div>
            <div class='container'>
            <div class='row'>
            <div class="col-md">
              <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Replicate Sign</h6>

                </div>
                <div class="card-body">
                <video className="videobox  border canvasbox" id = "canvas" autoPlay="autoPlay" id="webcam"></video>
                <canvas id="canvas" className="border canvasbox"></canvas>
                {/* <img id="thumbnail_img"></img>  */}
                </div>
                            
            </div>
            </div>
            <div class="col-md">
              <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Earnings Overview</h6>

                </div>
                <div class="card-body">
                <img id = "thumbnail_img" src="https://www.hbo.com/content/dam/hbodata/series/game-of-thrones/episodes/1/game-of-thrones-1-1920x1080.jpg/_jcr_content/renditions/cq5dam.web.1200.675.jpeg" class="img-thumbnail" alt="Responsive image"></img>

                </div>
                            

            </div>
            </div>
            </div>
            </div>
            </div>

            
        );
    }
}

export default Video;