# AWS Lambda + Rekognition

S3-event triggers whenever an image is added to an S3 bucket. The trigger will invoke a Lambda function. 
This Lambda function will call AWS Rekognition, and output the results in the same S3 bucket as a JSON file.

## Results


## How to use

1. Clone this repo.
2. `yarn` to build everything.
3. Go to AWS Console.
4. Create a Node.js 8.10 Lambda function When you create the function, add a Role giving full access to CloudWatch, Rekognition, and S3.
5. `yarn run deploy` to deploy our code to this new Lambda function!
6. Go to your S3 bucket. We are going to add a trigger so that our function fires whenever a `png` image is added. Click the "Properties" tab.
   Expand the "Events" panel. Add a Lambda trigger that should look like this:
7. Upload a png image to the S3 bucket. In a moment or so, you will
   see a JSON file with the results.
