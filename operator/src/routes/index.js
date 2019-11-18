const express = require('express');

const OperadoraController = require('../controllers/OperadoraController');

const routes = express.Router();

routes.get('/status', (req, res) => {
  return res.json({ status: 'Serviço disponível WS1' });
});

routes.post('/pay/:operadora', OperadoraController.store);

module.exports = routes;
