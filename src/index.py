
import json
import base64
from os import environ
import logging
import boto3
import datetime

from botocore.exceptions import ClientError

# Set up logging.
logger = logging.getLogger(__name__)

# Get the model ARN and confidence.
min_confidence = int(environ.get('CONFIDENCE', 50))

# Get the boto3 client.
rek_client = boto3.client('rekognition')
s3_client = boto3.client('s3')

def lambda_handler(event, context):
    """
    Lambda handler function
    param: event: The event object for the Lambda function.
    param: context: The context object for the lambda function.
    return: The labels found in the image passed in the event
    object.
    """

    try:

        
        records = event['Records'][0]
        # Determine image source.
        image = {
            'S3Object':
            {
                'Bucket':  records['s3']['bucket']['name'],
                'Name': records['s3']['object']['key']
            }
        }
        
        # Analyze the image.
        response = rek_client.detect_faces(Attributes=['ALL'], Image=image)

        lambda_response = {
            "statusCode": 200,
            "body": json.dumps(response)
        }
        
        print("Here is event img", records['s3']['object']['key'])
        # Upload the result to s3
        s3_client.put_object(
            Bucket=records['s3']['bucket']['name'],
            Key='result.json',
            Body=json.dumps(response)
        )
        

    except ClientError as err:
        error_message = f"Couldn't analyze image. " + \
            err.response['Error']['Message']

        lambda_response = {
            'statusCode': 400,
            'body': {
                "Error": err.response['Error']['Code'],
                "ErrorMessage": error_message
            }
        }
        logger.error("Error function %s: %s",
            context.invoked_function_arn, error_message)

    except ValueError as val_error:
        lambda_response = {
            'statusCode': 400,
            'body': {
                "Error": "ValueError",
                "ErrorMessage": format(val_error)
            }
        }
        logger.error("Error function %s: %s",
            context.invoked_function_arn, format(val_error))

    return lambda_response

