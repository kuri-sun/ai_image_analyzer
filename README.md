# AWS Lambda + Rekognition

S3-event triggers whenever an image is added to an S3 bucket. The trigger will invoke a Lambda function. 
This Lambda function will call AWS Rekognition, and output the results in the same S3 bucket as a JSON file.

## Cloud Architecture
![Untitled Diagram drawio](https://github.com/kuri-sun/img_label/assets/62743644/925787db-c28c-415c-bf60-72837618b607)

## Usage
1. Clone this repo.
2. Go to AWS Console.
3. Create a Python Lambda function When you create the function, add a Role giving full access to CloudWatch, Rekognition, and S3.
4. Go to your S3 bucket. We are going to add a trigger so that our function fires whenever a image is added. Click the "Properties" tab. Add a Lambda trigger for S3-PUT-event.
5. Upload a image to the S3 bucket. In a moment or so, you will see a 'result.json' file with the results.

## WorkFlow
https://github.com/kuri-sun/img_label/assets/62743644/40d70cf3-21f6-45d3-9ab7-d4aa23ec0802

## Results
It generates the AI anaylzed result like below.
![Screenshot 2023-10-11 at 11 43 17 PM](https://github.com/kuri-sun/img_label/assets/62743644/3fff0469-43af-409b-8c6b-e4a5f4b23277)
*test result is also available from here: https://github.com/kuri-sun/img_label/files/12877991/result.json

