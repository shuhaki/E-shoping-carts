const request = require('supertest');
const app = require('../server');

describe('Checkout API Endpoint', () => {
  test('POST /checkout should return status 200 for valid cart data', async () => {
    const cartData = [
      { id: 1, qty: 2 },
      { id: 2, qty: 1 }
    ];

    const response = await request(app)
      .post('/checkout')
      .send(cartData);

    expect(response.status).toBe(200);
  });

  test('POST /checkout should return JSON content type', async () => {
    const cartData = [{ id: 1, qty: 1 }];

    const response = await request(app)
      .post('/checkout')
      .send(cartData);

    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('POST /checkout should return success message', async () => {
    const cartData = [{ id: 1, qty: 1 }];

    const response = await request(app)
      .post('/checkout')
      .send(cartData);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Order placed successfully');
  });

  test('POST /checkout should handle empty cart', async () => {
    const cartData = [];

    const response = await request(app)
      .post('/checkout')
      .send(cartData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order placed successfully');
  });

  test('POST /checkout should handle cart with multiple items', async () => {
    const cartData = [
      { id: 1, qty: 3 },
      { id: 2, qty: 2 },
      { id: 3, qty: 1 }
    ];

    const response = await request(app)
      .post('/checkout')
      .send(cartData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order placed successfully');
  });
});