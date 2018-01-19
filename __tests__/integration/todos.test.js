// use serverless-stack-output to find service endpoint
const stackOutput = require('../../.build/stack.json');

const url = stackOutput.ServiceEndpoint;
const request = require('supertest')(url);

describe('/todos routes', () => {
  it('POST /todos returns an empty object', () => {
    const postObj = {
      title: 'Feed the cats',
      completed: false
    };

    return request
      .post('/todos')
      .send(postObj)
      .expect(200)
      .then((res) => {
        expect(res).toBeDefined();
        expect(res.body).toEqual({});
      });
  });

  it('GET /todos returns a list with the previously posted todo', () => {
    request
      .get('/todos')
      .expect(200)
      .then((res) => {
        expect(res).toBeDefined();
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0]).toHaveProperty('title', 'Feed the cats');
        expect(res.body[0]).toHaveProperty('completed', false);
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('updatedAt');
      });
  });
});
