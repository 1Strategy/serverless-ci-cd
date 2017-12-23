#! /bin/bash

ls -la

echo "Installing serverless"
echo "====================="
npm install -g serverless
npm install # we shouldn't need this, as serverless-dynamodb-local is a dev dependency, but it's throwing an error without it

echo "Deploying app"
echo "============="
serverless deploy --stage $env --package ./artifacts -v
