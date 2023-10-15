import "./App.css";
import { useState } from "react";
import axios from "axios";
import Webcam from "react-webcam";

function App() {
  // Please set Your AWS APIGateway Endpoint
  const awsAPIGatewayUrl =
    "https://lbulhrs2jj.execute-api.us-east-2.amazonaws.com/upload";

  // some web-cam configuration
  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "user",
  };
  // hold the captured photo.
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  // Analyze result loading
  const [isLoading, setIsLoading] = useState(false);
  // Analyze result
  const [analyzeResult, setAnalyzeResult] = useState(null);

  // Send a request and the taken image to AWS, to analyze the result.
  function onClickAnalyze() {
    setIsLoading(true);
    axios
      .post(
        awsAPIGatewayUrl,
        { content: capturedPhoto },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setAnalyzeResult(res.data.FaceDetails);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function renderEntry(label, value) {
    return (
      <div className="section">
        <div className="label">{label}</div>
        <div className="value">{value}</div>
      </div>
    );
  }

  function findMostApplicableEmotion(emotions) {
    let bestFit = emotions[0];
    emotions.forEach((emotion) => {
      if (bestFit.Confidence < emotion.Confidence) {
        bestFit = emotion;
      }
    });
    return bestFit;
  }

  return (
    <div className="App">
      <div className="container">
        {capturedPhoto ? (
          // Showing captured image
          <>
            {/* Image Preview */}
            <img className="captured-image" alt="preview" src={capturedPhoto} />
            {/* Analyze result */}
            {
              <div className="result-container">
                <div className="result-title">
                  Here are something we can tell from your face...
                </div>
                {analyzeResult?.map((personResult) => {
                  return (
                    <div className="result-list-container">
                      {renderEntry(
                        "Age",
                        "Your age could be " +
                          personResult.AgeRange.Low +
                          "-" +
                          personResult.AgeRange.High +
                          "."
                      )}
                      {renderEntry(
                        "Beard",
                        personResult.Beard.Value
                          ? "You probably have bread."
                          : "You probably don't have bread."
                      )}
                      {renderEntry(
                        "Smile",
                        personResult.Smile.Value
                          ? "You are probably smiling."
                          : "You are not smiling right now."
                      )}
                      {personResult.Emotions &&
                        renderEntry(
                          "Emotion",
                          "You are most likely " +
                            findMostApplicableEmotion(personResult.Emotions)
                              ?.Type +
                            " right now."
                        )}
                    </div>
                  );
                })}
              </div>
            }
            {/* Retake & Analyze button */}
            <div className="buttons">
              <button
                className="button gray-button"
                onClick={() => {
                  setCapturedPhoto(null);
                }}
                disabled={isLoading}
              >
                Retake
              </button>
              <button
                className="button"
                onClick={onClickAnalyze}
                disabled={isLoading || analyzeResult}
              >
                Analze my face
              </button>
            </div>
          </>
        ) : (
          // Web camera
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          >
            {({ getScreenshot }) => (
              <button
                className="button"
                onClick={() => {
                  const imageSrc = getScreenshot();
                  setCapturedPhoto(imageSrc);
                }}
                disabled={isLoading}
              >
                Capture
              </button>
            )}
          </Webcam>
        )}
      </div>
    </div>
  );
}

export default App;
