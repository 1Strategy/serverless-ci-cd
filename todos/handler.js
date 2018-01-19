const dynamoDbClient = require('serverless-dynamodb-client');
const Todos = require('./todos.js');

const dynamoDb = dynamoDbClient.doc;
const todos = new Todos(dynamoDb, `Todos-${process.env.STAGE}`);

module.exports.list = (event, context, callback) => {
  todos.list(callback);
};

module.exports.post = (event, context, callback) => {
  const body = JSON.parse(event.body);
  todos.post(body, callback);
};
