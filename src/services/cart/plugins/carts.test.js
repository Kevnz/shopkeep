const Hapi = require('hapi');
const request = require('supertest');
const assert = require('assert');

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: 3004
});

describe('Carts Plugin', () => {
  it('should get something', async () => {
    await server.register({ plugin: require('./carts'), options: { message: 'hello' } });

    request(server.listener)
      .get('/cart')
      .expect(200)
      .end((err, res) => {
        console.log('error', err);
        console.log('res', res);
        assert.fail('DO SOMETHING AMAZING DANG IT');

      });

  });
});
