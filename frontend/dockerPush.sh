#!/usr/bin/env bash

echo "Logging into ECR...\n"
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 909177173652.dkr.ecr.eu-central-1.amazonaws.com || { exit 1 ;}

echo "Building image...\n"
docker build . -t 909177173652.dkr.ecr.eu-central-1.amazonaws.com/warchol-frontend || { exit 1 ;}

echo "Pushing to repository...\n"
docker push 909177173652.dkr.ecr.eu-central-1.amazonaws.com/warchol-frontend || { exit 1 ;}