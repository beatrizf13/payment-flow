const express = require('express');

const PagamentoController = require('../controllers/PagamentoController');
const ClienteController = require('../controllers/ClienteController');
const CartaoController = require('../controllers/CartaoController');
const FaturaController = require('../controllers/FaturaController');
const LancamentoController = require('../controllers/LancamentoController');

const routes = express.Router();

routes.get('/status', (req, res) => {
  return res.json({ status: 'Serviço disponível WS2' });
});

routes.post('/pay', PagamentoController.store);

routes.post('/clientes', ClienteController.store);

routes.post('/cartoes/:cliente_id', CartaoController.store);
routes.get('/cartoes/:cliente_id', CartaoController.index);

routes.get('/faturas/:cartao_id', FaturaController.index);

routes.get('/lancamentos/:fatura_id', LancamentoController.index);

module.exports = routes;
