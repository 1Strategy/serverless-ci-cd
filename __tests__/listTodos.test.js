const Todos = require('../todos/todos.js');

describe('listTodos', () => {
  // mock the db
  const dbMock = {};
  dbMock.scan = jest
    .fn((params, callback) => {
      callback(null, { statusCode: 201, body: JSON.stringify([]) });
    })
    .mockName('db.scan');

  // create new instance of todos with fake db
  const todos = new Todos(dbMock, 'Todos-fakeStage');

  it('Calls the scan method once', () => {
    todos.list(() => { });

    expect(dbMock.scan.mock.calls).toHaveLength(1);
  });

  it('Calls the scan method with the correct arguments', () => {
    todos.list(() => { });

    expect(dbMock.scan.mock.calls[0][0]).toEqual({ TableName: 'Todos-fakeStage' });
    expect(dbMock.scan.mock.calls[1][0]).toBeTruthy();
  });

  it('Receives a response with status 200', () => {
    todos.list((err, res) => {
      expect(res.statusCode).toBe(200);
    });
  });

  it('Receives a response with the correct body', () => {
    todos.list((err, res) => {
      console.log('response--------');
      console.log(res);
      expect(res.body).toBe('[]');
    });
  });
});
