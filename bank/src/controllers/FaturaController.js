const Fatura = require('../models/Fatura');

module.exports = {
  async index(req, res) {
    const { cartao_id } = req.params;

    if (!cartao_id) {
      return res.status(401).json({ resposta: 'informe o id do cartão' });
    }

    const faturas_em_aberto = await Fatura.find({
      data_pagamento: null,
      tb_cartao_id: cartao_id,
    });

    return res.json(faturas_em_aberto);
  },
};
