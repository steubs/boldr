import { Info } from './AppStyles';
import ReactPlayer from 'react-player';
import '@tensorflow/tfjs-backend-webgl'
import * as poseDetection from '@tensorflow-models/pose-detection'
import { Pose, POSE_CONNECTIONS, LandmarkGrid, PoseConfig, landmarkContainer } from '@mediapipe/pose'
import { useState, useEffect } from 'react';

const App = () => {

  const [detector, setDetector] = useState();
  const [video, setVideo] = useState();
  const [poses, setPoses] = useState([]);
  const [pose, setPose] = useState([0]);

  useEffect(() => {
    //TODO: read about this
    //https://reactjs.org/docs/concurrent-mode-suspense.html
    async function buildPose() {
      setDetector(await poseDetection.createDetector(poseDetection.SupportedModels.BlazePose, { runtime: 'tfjs' }))
      setVideo(document.getElementById('video'));
      setPoses([...await detector.estimatePoses(video)]);
      setPose([...poses[0].keypoints])
    }
    buildPose();
  }, [])
  return (
    <div className="App">
      <ReactPlayer url='https://www.youtube.com/watch?v=dQw4w9WgXcQ&html5=True' />
      <Info>
        Coords: {pose[0]}
      </Info>
    </div>
  );
}

export default App;
