const express = require('express');

const BankController = require('../controllers/BankController');

const routes = express.Router();

routes.get('/status', (req, res) => {
  return res.json({ status: 'Serviço disponível WS2' });
});

routes.post('/pay', BankController.store);

module.exports = routes;
