const express = require('express');

const BrandController = require('../controllers/BrandController');

const routes = express.Router();

routes.get('/status', (req, res) => {
  return res.json({ status: 'Serviço disponível WS2' });
});

routes.get('/installments-limit/:bandeira', BrandController.index);

routes.post('/pay/:bandeira', BrandController.store);

module.exports = routes;
