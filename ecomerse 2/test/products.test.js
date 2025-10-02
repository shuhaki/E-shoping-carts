const request = require('supertest');
const app = require('../server');

describe('Products API Endpoint', () => {
  test('GET /products should return status 200', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
  });

  test('GET /products should return JSON content type', async () => {
    const response = await request(app).get('/products');
    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('GET /products should return an array of products', async () => {
    const response = await request(app).get('/products');
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /products should return the correct number of products', async () => {
    const response = await request(app).get('/products');
    expect(response.body.length).toBe(8);
  });

  test('GET /products should return products with required fields', async () => {
    const response = await request(app).get('/products');
    const product = response.body[0];
    
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('imageUrl');
  });

  test('GET /products should have products with correct data types', async () => {
    const response = await request(app).get('/products');
    const product = response.body[0];
    
    expect(typeof product.id).toBe('number');
    expect(typeof product.name).toBe('string');
    expect(typeof product.price).toBe('number');
    expect(typeof product.imageUrl).toBe('string');
  });

  test('GET /products should have products with valid price values', async () => {
    const response = await request(app).get('/products');
    
    response.body.forEach(product => {
      expect(product.price).toBeGreaterThan(0);
    });
  });

  test('GET /products should have unique product IDs', async () => {
    const response = await request(app).get('/products');
    const ids = response.body.map(product => product.id);
    const uniqueIds = [...new Set(ids)];
    
    expect(uniqueIds.length).toBe(ids.length);
  });
});