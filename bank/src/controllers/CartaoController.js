const Cartao = require('../models/Cartao');

module.exports = {
  async store(req, res) {
    const { cliente_id } = req.params;

    if (!cliente_id) {
      return res.status(401).json({ resposta: 'informe o id do cliente' });
    }

    const { numero, nome_cliente, bandeira, cod_seguranca } = req.body;

    if (!numero || !nome_cliente || !bandeira || !cod_seguranca) {
      return res.status(401).json({ resposta: 'informe todos os campos' });
    }

    const cartao = await Cartao.create({
      tb_cliente_id: cliente_id,
      numero,
      nome_cliente: nome_cliente.toUpperCase(),
      bandeira,
      cod_seguranca,
      limite_em_centavos: 100000,
      dia_fechamento_fatura: 1,
    });

    return res.json(cartao);
  },

  async index(req, res) {
    const { cliente_id } = req.params;

    if (!cliente_id) {
      return res.status(401).json({ resposta: 'informe o id do cliente' });
    }

    const cartoes = await Cartao.find({ tb_cliente_id: cliente_id });

    return res.send(cartoes);
  },
};
