#! /bin/bash

npm install -g serverless

serverless deploy --stage $env -v
