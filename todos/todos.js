const uuidv4 = require('uuid/v4');

class Todos {
  constructor(db, tableName) {
    this.db = db;
    this.tableName = tableName;
  }

  list(callback) {
    const params = {
      TableName: this.tableName
    };

    this.db.scan(
      params,
      (err, todos) => {
        if (err) {
          console.error(err);
          callback(`Failed to get all todos, with error: ${err}`);
          return;
        }

        const response = {
          statusCode: 200,
          body: JSON.stringify(todos.Items)
        };

        callback(null, response);
      }
    );
  }

  post(body, callback) {
    const params = {
      TableName: this.tableName,
      Item: {
        id: uuidv4(),
        title: body.title,
        completed: body.completed,
        updatedAt: Date.now()
      },
      ConditionExpression: 'attribute_not_exists(id)',
      ReturnConsumedCapacity: 'NONE'
    };

    this.db.put(
      params,
      (err, todo) => {
        if (err) {
          console.error(err);
          callback(`Failed to create todo, with error: ${err}`);
          return;
        }

        const response = {
          statusCode: 200,
          body: JSON.stringify(todo)
          // TODO: dynamoDB only returns empty object for a PUT;
          // return actual object in response
        };

        callback(null, response);
      }
    );
  }
}

module.exports = Todos;
