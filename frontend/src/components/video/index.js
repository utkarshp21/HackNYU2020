import React from 'react';
import * as handTrack from 'handtrackjs';
const axios = require("axios");

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
                <h1>Sign AI!</h1>
                <video className="videobox canvasbox" autoPlay="autoPlay" id="webcam"></video>
                <canvas id="canvas" className="border canvasbox"></canvas>
                <img id="thumbnail_img"></img>
            </div>
        );
    }
}

export default Video;