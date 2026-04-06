const request = require('supertest');
const express = require('express');

jest.mock('../../models/Product', () => ({
  find: jest.fn().mockResolvedValue([]),
  findById: jest.fn().mockResolvedValue(null),
}));

const productRoutes = require('../../routes/productRoutes');

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

describe('Product API', () => {
  test('GET /api/products should return an array', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/products/:id with wrong id should give 404', async () => {
    const res = await request(app).get('/api/products/507f1f77bcf86cd799439011');
    expect(res.status).toBe(404);
  });
});
