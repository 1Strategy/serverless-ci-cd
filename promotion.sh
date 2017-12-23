#! /bin/bash

ls -la

npm install -g serverless

serverless deploy --stage $env -v
