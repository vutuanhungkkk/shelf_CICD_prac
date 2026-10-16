const express = require('express');

const app = express();
app.use(express.json());

const products = [
  { id: '1', name: 'Notebook', price: 4.5 },
  { id: '2', name: 'Pen', price: 1.25 },
];

app.get('/health', (_request, response) => {
  response.json({ status: 'healthy' });
});

app.get('/api/products', (_request, response) => {
  response.json(products);
});

app.get('/api/products/:id', (request, response) => {
  const product = products.find((item) => item.id === request.params.id);

  if (!product) {
    return response.status(404).json({ error: 'Product not found' });
  }

  return response.json(product);
});

module.exports = app;