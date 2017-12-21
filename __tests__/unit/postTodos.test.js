const Todos = require('../../todos/todos.js');

describe('postTodos', () => {
// mock the db
  const dbMock = {};
  dbMock.put = jest
    .fn((params, callback) => {
      callback(null, {});
    })
    .mockName('db.put');

  // create new instance of todos with fake db
  const todos = new Todos(dbMock, 'Todos-fakeStage');

  const postObj = {
    title: 'Feed the cat',
    completed: false
  };

  it('Calls the put method once', () => {
    todos.post(postObj, () => {});

    expect(dbMock.put.mock.calls).toHaveLength(1);
  });

  it('Calls the put method with the correct arguments', () => {
    todos.post(postObj, () => {});

    expect(dbMock.put.mock.calls[0][0].TableName).toBe('Todos-fakeStage');
    expect(dbMock.put.mock.calls[1][0].Item).toHaveProperty('title', 'Feed the cat');
    expect(dbMock.put.mock.calls[1][0].Item).toHaveProperty('completed', false);
    expect(dbMock.put.mock.calls[1][0].Item).toHaveProperty('id');
    expect(dbMock.put.mock.calls[1][0].Item).toHaveProperty('updatedAt');
  });

  it('Receives a response with status 200', () => {
    todos.post(postObj, (err, res) => {
      expect(res.statusCode).toBe(200);
    });
  });

  it('Receives an empty object in the body', () => {
    todos.post(postObj, (err, res) => {
      const parsedBody = JSON.parse(res.body);
      expect(parsedBody).toEqual({});
    });
  });
});
