import React, { Component, useEffect, useState, useRef, setState } from 'react';
import { Info } from './AppStyles';
import ReactPlayer from 'react-player';

const App = () => {

  const handleVideoUpload = (event) => {
    //setVideoFilePath(URL.createObjectURL(event.target.files[0]));
  };

  useEffect(() => {
  })
  return (
    <div className="App">
      <input type="file" onChange={handleVideoUpload} />
      <br />
    </div>
  );
}
export default App;
