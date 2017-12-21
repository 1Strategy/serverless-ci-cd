const url = process.env.URL || 'http://localhost:3000';
const request = require('supertest')(url);

describe('/todos routes', () => {
  it('POST /todos returns an empty object', () => {
    const postObj = {
      title: 'Feed the cat',
      completed: false
    };

    return request
      .post('/todos')
      .send(postObj)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({});
      });
  });

  it('GET /todos returns a list with the previously posted todo', () => {
    request
      .get('/todos')
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0]).toHaveProperty('title', 'Feed the cat');
        expect(res.body[0]).toHaveProperty('completed', false);
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('updatedAt');
      });
  });
});
