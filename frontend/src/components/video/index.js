import React from 'react';
import * as handTrack from 'handtrackjs';
const axios = require("axios");
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import Question from '../App/Question';
import MainNav from '../App/MainNav';


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
        var alph = new Array(26).fill(0);
        var i;
        for(i = 65; i < 91; i=i+1) {
          alph[i-65] = String.fromCharCode(i);
        };
        return (
          
            <div>
              {/* <div>
                    <MainNav/> 
                </div> */}
                <div class container>
                  <div class = "row">
                    <div className="col-md-12">
                    <div className="text-xs font-weight-bold text-uppercase mb-1">
                      <h1>SIGN AI</h1>
                      </div>
                </div>
                </div>
                </div>
                <div className="row mt-4">
                <div className="col-md-4 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Correct</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">0</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">Incorrect</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">0</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            <div className="col-md-4 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Score</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">0</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            </div>
            <div className='container'>
            <div className='row'>
            <div className="col-md-6">
              <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">Replicate Sign</h6>

                </div>
                <div className="card-body">
                <video className="videobox  border canvasbox" id = "canvas" autoPlay="autoPlay" id="webcam"></video>
                <canvas id="canvas" className="border canvasbox"></canvas>
                {/* <img id="thumbnail_img"></img>  */}
                </div>
                            
            </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">Image</h6>

                </div>
                <div className="card-body">
                <img  id = "static_img" src="https://www.hbo.com/content/dam/hbodata/series/game-of-thrones/episodes/1/game-of-thrones-1-1920x1080.jpg/_jcr_content/renditions/cq5dam.web.1200.675.jpeg" class="img-thumbnail" alt="Responsive image"></img>
                <img id="thumbnail_img"></img> 
                </div>

                </div>
                </div>
                <div className='container'>
              <div className = 'row'>           
                <div className="col-md-12">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      {/* <div class="text-xs font-weight-bold text-success text-uppercase mb-1"style={{backgroundColor:'blue'}}>SENTENCE</div> */}
                      <div>
                      <Question content="Do the sign for the following letter: " />
                      <div>{alph}</div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
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