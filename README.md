# AWS Project - AI Face Image Analyze

FE React app takes the user's face and send to the BE. FE consists of S3, BE is by Lambda and API Gateway.
BE sends the image AWS Rekognition to analyze it, and sends back the result.

## Cloud Architecture
![Untitled Diagram drawio (1)](https://github.com/kuri-sun/ai_image_analyzer/assets/62743644/c1ce1c29-d24a-495c-949c-0c5c2a33aac9)

## Usage
1. Go to AWS Console.
3. Create a Python Lambda function based on the src/index.py, add a Role giving full access to CloudWatch, Rekognition, and S3.
4. Set up API Gateway and connect that to the Lambda functrion. (set up some firewall and api throttle, if you want)
5. Serverless BE is ready(fast! and easy-to-manage!), let's create FE by build the React app.
6. Go to S3, and deploy this by using static-website-hosting feature of S3.
7. You are ready, check out your S3 web app endpoint to use the app!

## WorkFlow
https://github.com/kuri-sun/img_label/assets/62743644/40d70cf3-21f6-45d3-9ab7-d4aa23ec0802

## AI Example results
AWS Rekognition generates the AI anaylzed result like below. Consider bring AI on your product.
https://github.com/kuri-sun/img_label/files/12877991/result.json

