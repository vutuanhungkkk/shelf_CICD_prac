const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');

test('GET /health reports a healthy service', async () => {
  const response = await request(app).get('/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'healthy');
});

test('GET /api/products returns the product list', async () => {
  const response = await request(app).get('/api/products');

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
  assert.ok(response.body.length > 0);
});

test('GET /api/products/:id returns 404 for an unknown product', async () => {
  const response = await request(app).get('/api/products/does-not-exist');

  assert.equal(response.status, 404);
  assert.deepEqual(response.body, { error: 'Product not found' });
});