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
}

module.exports = Todos;
