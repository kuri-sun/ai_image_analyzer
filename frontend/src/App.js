import { useState } from 'react';
import './App.css';
import Webcam from "react-webcam";
import axios from "axios";

function App() {
  // some web-cam configuration
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  // hold the captured photo.
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  // analyzed image result
  const [analyzeImageResultByAI, setAnalyzeImageResultByAI,] = useState(null);

  /*
    Send a request and the taken image to AWS, to analyze the result.
  */
  function onClickAnalyze() {
    let formData = new FormData();
    formData.append("file", capturedPhoto);
    axios.post(
        "TODO: Your AWS APIGateway Endpoint",
        formData, 
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )
        .then(res => {
          setAnalyzeImageResultByAI(res.data);
        })
        .catch(err => {
          console.error(err);
        })
  }

  return (
    <div className="App">
      {
        capturedPhoto
        ?
        // Showing captured image
        <>
            {/* Captured image */}
            <img className='captured-image' src={capturedPhoto} />
            {/* Retake & Analyze button */}
            <div className='buttons'>
              <button
                className='retake-button'
                onClick={() => {
                  // When user clicks "retake".
                  setCapturedPhoto(null);
                }}
              >
                Retake
              </button>
              <button
                className='analyze-button'
                onClick={() => {
                  // When user clicks "analyze".
                  onClickAnalyze()
                }}
              >
                Analze your face
              </button>
            </div>
        </>
        :
        // Web camera
        <Webcam
          audio={false}
          height={720}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        >
          {
            ({ getScreenshot }) => (
              // Capture button
              <button
                className='capture-button'
                onClick={() => {
                  // When user clicks "capture" button
                  const imageSrc = getScreenshot();
                  setCapturedPhoto(imageSrc);
                }}
              >
                Capture
              </button>
            )
          }
        </Webcam>
      }
      {
        analyzeImageResultByAI 
        &&
        <div className='ai-result'>
          <div>AI says your face is...</div>
          {
            analyzeImageResultByAI
          }
        </div>
      }
    </div>
  );
}

export default App;
