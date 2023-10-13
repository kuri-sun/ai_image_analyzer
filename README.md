# AWS AI Image detection

S3-event triggers whenever an image is added to an S3 bucket. The trigger will invoke a Lambda function. 
This Lambda function will call AWS Rekognition, and output the results in the same S3 bucket as a JSON file.

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

## Results
It generates the AI anaylzed result like below.
![Screenshot 2023-10-11 at 11 43 17 PM](https://github.com/kuri-sun/img_label/assets/62743644/3fff0469-43af-409b-8c6b-e4a5f4b23277)
*test result is also available from here: https://github.com/kuri-sun/img_label/files/12877991/result.json

