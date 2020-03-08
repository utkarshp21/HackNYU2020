import React from 'react';
import * as handTrack from 'handtrackjs';
const axios = require("axios");
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import Question from '../App/Question';
import MainNav from '../App/MainNav';
import ImageCarousel from './carousel';
import ProgressBar from 'react-bootstrap/ProgressBar'

class Video extends React.Component {
  
    sign_images = [{
          "name":"A",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/A.jpg?raw=true"
        },
        {
          "name":"B",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/B.jpg?raw=true"
        },
        {
          "name":"C",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/C.jpg?raw=true"
        },
        {
          "name":"D",
          "image": "https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/D.jpg?raw=true"
        },
        {
          "name":"E",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/E.jpg?raw=true"
        },
        {
          "name":"F",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/F.jpg?raw=true"
        },
        {
          "name":"G",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/G.jpg?raw=true"
        },
        {
          "name":"H",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/H.jpg?raw=true"
        },
        {
          "name":"I",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/I.jpg?raw=true"
        },
        {
          "name":"J",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/J.jpg?raw=true"
        },
        {
          "name":"K",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/K.jpg?raw=true"
        },
        {
          "name":"L",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/L.jpg?raw=true"
        },
        {
          "name":"M",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/M.jpg?raw=true"
        },
        {
          "name":"N",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/N.jpg?raw=true"
        },
        {
          "name":"O",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/O.jpg?raw=true"
        },
        {
          "name":"P",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/P.jpg?raw=true"
        },
        {
          "name":"Q",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/Q.jpg?raw=true"
        },
        {
          "name":"R",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/R.jpg?raw=true"
        },
        {
          "name":"S",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/S.jpg?raw=true"
        },
        {
          "name":"T",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/T.jpg?raw=true"
        },
        {
          "name":"U",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/U.jpg?raw=true"
        },
        {
          "name":"V",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/V.jpg?raw=true"
        },
        {
          "name":"W",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/W.jpg?raw=true"
        },
        {
          "name":"X",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/X.jpg?raw=true"
        },
        {
          "name":"Y",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/Y.jpg?raw=true"
        },
        {
          "name":"Z",
          "image":"https://github.com/utkarshp21/HackNYU2020/blob/master/Alphabet%20Reference/Z.jpg?raw=true"
        },

    ]

    constructor(props) {
        super(props);
        this.state = { 
          selected_image : this.sign_images[0],
          total_questions : this.sign_images.length,
          correct_count: 0,
        };
    }
    
    model = null;
    
    makeRequest = true;

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

                
               
               console.log("Try");
               
               if (this.makeRequest){
                 // set the source of the img tag
                //  const img = document.getElementById('thumbnail_img');
                //  img.setAttribute('src', dataURL);

                  console.log("Reuqets Made");
                  axios.post("http://localhost:3000/post_image", { "img": dataURL })
                      .then((response) => {
                          console.log("The file is successfully uploaded");
                      }).catch((error) => {
                  });
                  this.makeRequest = false;
                  
                  setTimeout(() => {
                    this.makeRequest = true;
                  }, 4000);
               }
            }
            
            // console.log("Predictions: ", predictions);
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
    
    myCallback = (data) =>{
      this.setState({ selected_image: data});
    }
    
    render() {
        var alph = new Array(26).fill(0);
        var i;
        for(i = 65; i < 91; i=i+1) {
          alph[i-65] = String.fromCharCode(i);
        };
        const percentage = (((((this.state.selected_image.name).charCodeAt(0))-64)/26)*100);
        return (
            <div>
                <div className container>
                  <div className = "row">
                    <div className="col mr-12">
                    <div className="text-xs font-weight-bold  mb-1">
                      <h1>SignAI</h1>
                      </div>
                </div>
                </div>
                </div>
                <div>
                  <ProgressBar className="myProgress" active now={Math.floor(percentage)} label={`${Math.floor(percentage)}%`} />
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
                <h6 className="m-0 font-weight-bold text-primary">Try it Yourself </h6>
                </div>
                <div className="card-body">
                <video className="videobox  border canvasbox" autoPlay="autoPlay" id="webcam"></video>
                <canvas id="canvas" className="border canvasbox"></canvas>
                {/* <img id="thumbnail_img"></img>  */}
                </div>           
            </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Reference Sign</h6>

                </div>
                <div className="card-body">
                  <ImageCarousel imageList={this.sign_images} callbackFromParent={this.myCallback}></ImageCarousel>
                {/* <img  id = "static_img" src="https://www.hbo.com/content/dam/hbodata/series/game-of-thrones/episodes/1/game-of-thrones-1-1920x1080.jpg/_jcr_content/renditions/cq5dam.web.1200.675.jpeg" className="img-thumbnail" alt="Responsive image"></img> */}
                {/* <img id="thumbnail_img"></img>  */}
                </div>

                </div>
                </div>
                <div className='container'>
              <div className = 'row'>           
                <div className="col-md-12">
              <div className="card border-left-success shadow h-200 py-2">
                <div className="card-body next-prev">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2"
                    >
                      <div>
                      <Question content="Complete the sign for the following letter: " />
                      <div>
                      <h1>{this.state.selected_image.name}</h1>
                      </div>
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