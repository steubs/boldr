import React, { Component, useEffect, useState, useRef, setState } from 'react';
import { Info } from './AppStyles';
import ReactPlayer from 'react-player';

import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'

import { Pose, POSE_CONNECTIONS, LandmarkGrid, PoseConfig, landmarkContainer } from '@mediapipe/pose';

import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";


const App = () => {
  const webcamRef = useRef(0);
  const canvasRef = useRef(0);
  let camera = null;
  const [videoFilePath, setVideoFilePath] = useState(null);
  const [poseData, setPoseData] = useState(null);

  const handleVideoUpload = (event) => {
    setVideoFilePath(URL.createObjectURL(event.target.files[0]));
  };
  const handleProgress = () => {
    //console.log(webcamRef.current.getInternalPlayer())
    getPoses(poseData)
  };
  const onResults = (results) => {

    //canvasRef.current.width = webcamRef.current.width;
    //canvasRef.current.height = webcamRef.current.height

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

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
      { color: '#000000', lineWidth: 1 });
    drawLandmarks(canvasCtx, results.poseLandmarks,
      { color: '#000000', lineWidth: 1, radius: 1 });
    drawLandmarks(canvasCtx, results.poseWorldLandmarks,
      { color: '#000000', lineWidth: 1, radius: 1 });
    canvasCtx.restore();
    //console.log("results")
    //console.log(results.poseLandmarks)
    console.log(results.poseWorldLandmarks)
  };
  const getPoses = async (pose) => {
    //console.log(webcamRef.current.getInternalPlayer())
    await pose.send({ image: webcamRef.current.getInternalPlayer() });

    setPoseData(pose);
    //console.log(pose.poseWorldLandmarks[0])
    //console.log(typeof pose)
  };
  useEffect(() => {
    if (videoFilePath !== null && typeof webcamRef.current !== undefined) {
      const pose = new Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
      });
      //console.log('setoptions start')
      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      pose.onResults(onResults);
      console.log('useEff start')
      getPoses(pose);
    }
  })
  return (
    <div className="App">
      <input type="file" onChange={handleVideoUpload} />
      <br />

      <ReactPlayer
        ref={webcamRef}
        url={videoFilePath}
        playing={true}
        controls={true}
        onProgress={handleProgress}
        style={{
          position: "absolute",
          marginLeft: "0px",
          marginRight: "0px",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: "640px",
          height: "360px",
          marginBottom: "0px"
        }}

      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "0px",
          marginRight: "0px",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 999,
          width: "640px",
          height: "360px",
          marginBottom: "0px"
        }}>
      </canvas>



    </div>
  );
}
export default App;
