import React, { Component, useEffect, useState, useRef, setState } from 'react';
import { Info } from './AppStyles';
import ReactPlayer from 'react-player';

import Amplify, { API, Storage } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);
const App = () => {
  const [name, setName] = useState('')
  const [file, setFile] = useState('')
  const [response, setResponse] = useState('')

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    setFile(file)
    setName(file.name)
    try {
      await Storage.put(file.name, file, {
        progressCallback(progress) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
      }).then(result => console.log(result));
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
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
