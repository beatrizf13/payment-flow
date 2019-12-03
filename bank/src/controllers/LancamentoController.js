const Parcela = require('../models/Parcela');

module.exports = {
  async index(req, res) {
    const { fatura_id } = req.params;

    if (!fatura_id) {
      return res.status(401).json({ resposta: 'informe o id da fatura' });
    }

    const lancamentos = await Parcela.find({
      tb_fatura_id: fatura_id,
    });

    return res.json(lancamentos);
  },
};
