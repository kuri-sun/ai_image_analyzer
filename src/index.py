import json
import base64
from os import environ
import logging
import boto3

from botocore.exceptions import ClientError

# Set up logging.
logger = logging.getLogger(__name__)
# Get the Rekognition client.
rek_client = boto3.client("rekognition")
# Get the S3 client.
s3_client = boto3.client("s3")


def lambda_handler(event, context):
    try:
        s3_bucket_name = "ai-face-image-bucket"
        s3_object_key = "face.jpeg"

        # Extract the image from HTTP Request.
        data = json.loads(event["body"])["content"]
        data = data[data.find(",") + 1 :]
        b64decode = base64.b64decode(data)
        print("b64decode", b64decode)

        # Upload the image to S3.
        s3_client.put_object(
            Bucket=s3_bucket_name,
            Key=s3_object_key,
            Body=b64decode,
            ContentType="image/jpeg",
        )
        print("upload")

        # Analyze the image by Rekognition.
        response = rek_client.detect_faces(
            Attributes=["ALL"],
            Image={
                "S3Object": {
                    "Bucket": s3_bucket_name,
                    "Name": s3_object_key,
                },
            },
        )
        print("ai")

        # Set HTTP response.
        lambda_response = {
            "statusCode": 200,
            "body": json.dumps(response),
            "headers": {
                "Content-Type": "application/json",
            },
        }

    except ClientError as err:
        error_message = f"Couldn't analyze image. " + err.response["Error"]["Message"]

        lambda_response = {
            "statusCode": 400,
            "body": {
                "Error": err.response["Error"]["Code"],
                "ErrorMessage": error_message,
            },
            "headers": {
                "Content-Type": "application/json",
            },
        }
        logger.error(
            "Error function %s: %s", context.invoked_function_arn, error_message
        )

    except ValueError as val_error:
        lambda_response = {
            "statusCode": 400,
            "body": {"Error": "ValueError", "ErrorMessage": format(val_error)},
            "headers": {
                "Content-Type": "application/json",
            },
        }
        logger.error(
            "Error function %s: %s", context.invoked_function_arn, format(val_error)
        )

    return lambda_response
