#! /bin/bash

ls -la

npm install -g serverless

serverless deploy --stage $env --package ./artifacts -v
