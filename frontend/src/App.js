import "./App.css";
import { useState } from "react";
import axios from "axios";
import Webcam from "react-webcam";
const r = [
  {
    BoundingBox: {
      Width: 0.27666205167770386,
      Height: 0.37356922030448914,
      Left: 0.20288828015327454,
      Top: 0.2602129876613617,
    },
    AgeRange: { Low: 20, High: 28 },
    Smile: { Value: false, Confidence: 95.08031463623047 },
    Eyeglasses: { Value: false, Confidence: 97.55809020996094 },
    Sunglasses: { Value: false, Confidence: 99.99665832519531 },
    Gender: { Value: "Male", Confidence: 99.99815368652344 },
    Beard: { Value: false, Confidence: 53.15668487548828 },
    Mustache: { Value: false, Confidence: 98.18101501464844 },
    EyesOpen: { Value: true, Confidence: 98.61134338378906 },
    MouthOpen: { Value: false, Confidence: 94.96459197998047 },
    Emotions: [
      { Type: "CALM", Confidence: 99.47063446044922 },
      { Type: "SURPRISED", Confidence: 6.34379768371582 },
      { Type: "FEAR", Confidence: 5.8850932121276855 },
      { Type: "SAD", Confidence: 2.1612653732299805 },
      { Type: "CONFUSED", Confidence: 0.15251639485359192 },
      { Type: "ANGRY", Confidence: 0.060918960720300674 },
      { Type: "DISGUSTED", Confidence: 0.03375569358468056 },
      { Type: "HAPPY", Confidence: 0.025235846638679504 },
    ],
    Landmarks: [
      { Type: "eyeLeft", X: 0.2608684003353119, Y: 0.4007129371166229 },
      { Type: "eyeRight", X: 0.38269495964050293, Y: 0.3954404592514038 },
      { Type: "mouthLeft", X: 0.27382272481918335, Y: 0.5454056262969971 },
      { Type: "mouthRight", X: 0.37511682510375977, Y: 0.5412354469299316 },
      { Type: "nose", X: 0.3062569200992584, Y: 0.4686839282512665 },
      {
        Type: "leftEyeBrowLeft",
        X: 0.22011761367321014,
        Y: 0.3721049427986145,
      },
      { Type: "leftEyeBrowRight", X: 0.2789230942726135, Y: 0.354966938495636 },
      { Type: "leftEyeBrowUp", X: 0.2462814897298813, Y: 0.3502236604690552 },
      {
        Type: "rightEyeBrowLeft",
        X: 0.3492482900619507,
        Y: 0.35171806812286377,
      },
      {
        Type: "rightEyeBrowRight",
        X: 0.4327678978443146,
        Y: 0.3628709614276886,
      },
      { Type: "rightEyeBrowUp", X: 0.3878380358219147, Y: 0.34388765692710876 },
      { Type: "leftEyeLeft", X: 0.24104881286621094, Y: 0.4018830955028534 },
      { Type: "leftEyeRight", X: 0.2849452793598175, Y: 0.40115028619766235 },
      { Type: "leftEyeUp", X: 0.25925931334495544, Y: 0.39315664768218994 },
      { Type: "leftEyeDown", X: 0.2613315284252167, Y: 0.40700915455818176 },
      { Type: "rightEyeLeft", X: 0.35860002040863037, Y: 0.3979251980781555 },
      { Type: "rightEyeRight", X: 0.4064856171607971, Y: 0.394851952791214 },
      { Type: "rightEyeUp", X: 0.38179951906204224, Y: 0.3878307640552521 },
      { Type: "rightEyeDown", X: 0.3821614682674408, Y: 0.4018731415271759 },
      { Type: "noseLeft", X: 0.29393014311790466, Y: 0.488812118768692 },
      { Type: "noseRight", X: 0.3394377529621124, Y: 0.4869919717311859 },
      { Type: "mouthUp", X: 0.31600600481033325, Y: 0.5214061141014099 },
      { Type: "mouthDown", X: 0.3194320499897003, Y: 0.5655575394630432 },
      { Type: "leftPupil", X: 0.2608684003353119, Y: 0.4007129371166229 },
      { Type: "rightPupil", X: 0.38269495964050293, Y: 0.3954404592514038 },
      {
        Type: "upperJawlineLeft",
        X: 0.2136375457048416,
        Y: 0.4171658456325531,
      },
      { Type: "midJawlineLeft", X: 0.23919235169887543, Y: 0.5683850049972534 },
      { Type: "chinBottom", X: 0.3288883566856384, Y: 0.6419945359230042 },
      { Type: "midJawlineRight", X: 0.4572582244873047, Y: 0.5596132278442383 },
      {
        Type: "upperJawlineRight",
        X: 0.48148176074028015,
        Y: 0.4055982232093811,
      },
    ],
    Pose: {
      Roll: -3.2322449684143066,
      Yaw: -9.254341125488281,
      Pitch: 9.754472732543945,
    },
    Quality: { Brightness: 50.378684997558594, Sharpness: 53.330047607421875 },
    Confidence: 99.99711608886719,
    FaceOccluded: { Value: false, Confidence: 99.936279296875 },
    EyeDirection: {
      Yaw: 4.353731155395508,
      Pitch: 3.6886229515075684,
      Confidence: 99.96870422363281,
    },
  },
];

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
    setAnalyzeResult(r);
    return;

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
            <img className="captured-image" src={capturedPhoto} />
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
