import React, { Component, useEffect, useState, useRef } from 'react';
import { Info } from './AppStyles';
import ReactPlayer from 'react-player';
import Webcam from 'react-webcam'
import * as cam from '@mediapipe/camera_utils'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'

//import '@tensorflow/tfjs-backend-webgl'
//import * as poseDetection from '@tensorflow-models/pose-detection'

import { Pose, POSE_CONNECTIONS, LandmarkGrid, PoseConfig, landmarkContainer } from '@mediapipe/pose';

import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";


function App() {
  const webcamRef = useRef(0)
  const canvasRef = useRef(0)
  let camera = null
  function onResults(results) {

    canvasRef.current.width = webcamRef.current.video.videoWidth
    canvasRef.current.height = webcamRef.current.video.videoHeight

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d")

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    )
    drawConnectors(canvasCtx,
      results.poseLandmarks, POSE_CONNECTIONS,
      { color: '#FFFFFF', lineWidth: 1 });
    drawLandmarks(canvasCtx, results.poseLandmarks,
      { color: '#FFFFFF', lineWidth: 1, radius: 1 });
    drawLandmarks(canvasCtx, results.poseWorldLandmarks,
      { color: '#FFFFFF', lineWidth: 1, radius: 1 });
    canvasCtx.restore();
  }
  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      }
    });
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    pose.onResults(onResults)
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current.video })
        },
        width: 400,
        height: 400
      });
      camera.start()
    }
  })
  return (
    <div className="App">
      <ReactPlayer
        ref={webcamRef}
        url='https://www.youtube.com/watch?v=dQw4w9WgXcQ&html5=True'
        playing={true} />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "0px",
          marginRight: "0px",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 400,
          height: 400,
          marginBottom: "0px"
        }}>
      </canvas>
    </div>
  );
}
{/* <Webcam

  style={{
    position: "absolute",
    marginLeft: "0px",
    marginRight: "0px",
    left: 0,
    right: 0,
    textAlign: "center",
    zindex: 9,
    width: 400,
    height: 400,
    marginBottom: "0px",
  }} /> */}
export default App;
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.vidRef = React.createRef();
//     this.state = {
//       detector: null,
//       video: null,
//       poses: [],
//       pose: null
//     };
//   }
//   function onResults(results) {
//   console.log("RESULTS:")
//   console.log(results)
//   console.log(results.poseWorldLandmarks)
// }
// async componentDidMount() {
//   const pose = new Pose({
//     locateFile: (file) => {
//       return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
//     }
//   });
//   pose.setOptions({
//     modelComplexity: 1,
//     smoothLandmarks: true,
//     minDetectionConfidence: 0.5,
//     minTrackingConfidence: 0.5
//   });
//   pose.onResults(onResults);

//   //console.log(poseDetection.SupportedModels);
//   //const getDetector = await poseDetection.createDetector(poseDetection.SupportedModels.BlazePose, { runtime: 'mediapipe' });
//   //const getDetector = await poseDetection.createDetector(poseDetection.SupportedModels.BlazePose, { runtime: 'tfjs' });
//   console.log("AAAAAA");

//   // this.setState((state) => ({
//   //   //detector: getDetector,
//   //   //video: this.vidRef.current
//   // }, () => {
//   //   console.log("Detector and vid setState done");
//   // }));

// }
// // async componentDidUpdate() {
// //   console.log("Poses start:");
// //   const getPoses = await detector.estimatePoses(video);
// //   this.setState((state) => ({
// //     poses: getPoses
// //   }, () => {
// //     console.log("Poses done:");
// //     console.log(poses[0].keypoints);
// //   }));
// // }
// render() {
//   return (
//     <div className="App">
//       <ReactPlayer ref={this.vidRef} url='https://www.youtube.com/watch?v=dQw4w9WgXcQ&html5=True' />
//       <Info>
//         Keypoints:{this.state.pose}
//       </Info>
//     </div>
//   );
// };
// }

// export default App;
