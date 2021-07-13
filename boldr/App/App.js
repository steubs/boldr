import { Info } from './AppStyles';
import ReactPlayer from 'react-player';
import '@tensorflow/tfjs-backend-webgl'
import '@mediapipe/pose'
import * as poseDetection from '@tensorflow-models/pose-detection'
import { Pose, POSE_CONNECTIONS, LandmarkGrid, PoseConfig, landmarkContainer } from '@mediapipe/pose'

import React, { Component, useState, useEffect } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.vidRef = React.createRef();
    this.state = {
      detector: null,
      video: null,
      poses: []
    };
  }
  async componentDidMount() {
    const getDetector = await poseDetection.createDetector(poseDetection.SupportedModels.BlazePose, { runtime: 'mediapipe' });

    //const getDetector = await poseDetection.createDetector(poseDetection.SupportedModels.BlazePose, { runtime: 'tfjs' });
    this.setState((state) => ({
      detector: getDetector,
      video: this.vidRef.current
    }));
    console.log();
  }
  async componentDidUpdate() {
    const getPoses = await detector.estimatePoses(video);
    this.setState((state) => ({
      poses: getPoses
    }));
  }
  render() {
    return (
      <div className="App">
        <ReactPlayer ref={this.vidRef} url='https://www.youtube.com/watch?v=dQw4w9WgXcQ&html5=True' />
        <Info>

        </Info>
      </div>
    );
  };
}

export default App;
