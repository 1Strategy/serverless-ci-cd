#! /bin/bash

ls -la
ls -la artifacts/

npm install -g serverless

serverless deploy --stage $env --package artifacts -v
