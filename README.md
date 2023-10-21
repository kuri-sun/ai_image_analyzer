# AWS Project - AI Face Image Analyze

The FE React app takes a photo of the user's face and send it to the serverless BE. the FE can be hosted by Netlify, the BE is by Lambda and API Gateway.
The BE sends the image AWS Rekognition to analyze it, and sends back the result.
<br/>
<br/>

## Cloud Architecture

![Untitled Diagram drawio (1)](https://github.com/kuri-sun/ai_image_analyzer/assets/62743644/c1ce1c29-d24a-495c-949c-0c5c2a33aac9)

## Usage

1. Create a Python Lambda function based on the src/index.py, add a Role giving full access to CloudWatch, Rekognition, and S3.
2. Set up API Gateway and connect that to the Lambda functrion. (set up some firewall and api throttle, if you want)
3. Serverless BE is ready(fast! and easy-to-manage!), let's create FE by build the React app.
4. Go to S3, and deploy this by using static-website-hosting feature of S3.
5. You are ready, check out your S3 web app endpoint to use the app!

## WorkFlow

https://github.com/kuri-sun/ai_image_analyzer/assets/62743644/cbcff02a-9116-42c9-bdac-fc3d833c3cbc

## The AI API result

AWS Rekognition generates the AI anaylzed result like below. Consider bring AI on your product. Also Example JSON result: https://github.com/kuri-sun/img_label/files/12877991/result.json
![Screenshot 2023-10-15 at 4 49 36 PM](https://github.com/kuri-sun/ai_image_analyzer/assets/62743644/8dae8eb3-4d81-47d7-acb7-9843794b65da)

