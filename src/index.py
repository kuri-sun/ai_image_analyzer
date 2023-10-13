
import json
import base64
from os import environ
import logging
import boto3

from botocore.exceptions import ClientError

# Set up logging.
logger = logging.getLogger(__name__)
# Get the Rekognition client.
rek_client = boto3.client('rekognition')
# Get the S3 client.
s3_client = boto3.client('s3')

def lambda_handler(event, context):

    try:

        # Extract the image from HTTP Request.
        s3_bucket_name = 'your-bucket-name'
        s3_object_key = 'images/' + event['filename']
        upload_file_content = base64.b64decode(event['body'])

        # Upload the image to S3.
        s3_client.put_object(Bucket=s3_bucket_name, Key=s3_object_key, Body=upload_file_content)
        
        # Analyze the image by Rekognition.
        image = {
            'S3Object':
            {
                'Bucket': s3_bucket_name,
                'Name': s3_object_key,
            }
        }
        response = rek_client.detect_faces(Attributes=['ALL'], Image=image)

        # Set HTTP response.
        lambda_response = {
            "statusCode": 200,
            "body": json.dumps(response)
        }

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

