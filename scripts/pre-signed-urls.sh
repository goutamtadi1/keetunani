#!/usr/bin/env python3

import boto3
import requests
from botocore.client import Config

cors_configuration = {
    'CORSRules': [{
        'AllowedHeaders': ['*'],
        'AllowedMethods': ['GET', 'PUT', 'POST'],
        'AllowedOrigins': ['*'],
        'ExposeHeaders': [],
    }]
}


# Initialize boto3 to use the S3 client.
s3_client = boto3.client('s3', config=Config(signature_version='s3v4'))
s3_client.put_bucket_cors(Bucket='gender-reveals', CORSConfiguration=cors_configuration)

# Generate the S3 presigned URL
s3_presigned_url = s3_client.generate_presigned_url(
    ClientMethod='put_object',
    Params={
        'Bucket': 'gender-reveals',
        'Key': 'data/data.json'
    },
    ExpiresIn=360000
)

# Print the created S3 presigned URL
print("PUT URL: ", s3_presigned_url)

s3_presigned_url = s3_client.generate_presigned_url(
    ClientMethod='get_object',
    Params={
        'Bucket': 'gender-reveals',
        'Key': 'data/data.json'
    },
    ExpiresIn=360000
)

# Print the created S3 presigned URL
print("GET URL", s3_presigned_url)