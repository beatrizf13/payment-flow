const moment = require('moment');

const Cartao = require('../models/Cartao');
const Compra = require('../models/Compra');
const Parcela = require('../models/Parcela');
const Fatura = require('../models/Fatura');

module.exports = {
  // Envia para o NaNBank os dados da compra e cartão para cadastro da despesa no cadastro do cliente.
  async store(req, res) {
    const {
      numero_cartao,
      nome_cliente,
      bandeira,
      cod_seguranca,
      valor_em_centavos,
      parcelas,
    } = req.body;

    const cartao = await Cartao.findOne({
      numero: numero_cartao,
      bandeira,
      cod_seguranca,
      nome_cliente: nome_cliente.toUpperCase(),
    });

    if (!cartao) {
      return res.status(404).json({ resposta: 'Cartão não encontrado' });
    }

    // o cliente possui limite no cartão de crédito?
    if (valor_em_centavos > cartao.limite_em_centavos) {
      return res.status(401).json({ resposta: 'Limite indisponível' });
    }

    const compra = await Compra.create({
      tb_cartao_id: cartao._id,
      valor_em_centavos,
    });

    cartao.limite_em_centavos -= valor_em_centavos;

    cartao.save();

    let fatura = await Fatura.findOne({
      tb_cartao_id: cartao._id,
      data_inicial: moment().startOf('month'),
    });

    if (!fatura) {
      fatura = await Fatura.create({
        tb_cartao_id: cartao._id,
        data_inicial: moment().startOf('month'),
        data_final: moment().endOf('month'),
      });
    }

    const valor_parcela = valor_em_centavos / parcelas;

    for (let i = 0; i < parcelas; i++) {
      await Parcela.create({
        tb_compra_id: compra.id,
        tb_fatura_id: fatura._id,
        valor_em_centavos: valor_parcela,
      });
    }

    return res.json({
      resposta: 'sucesso',
      nome_cliente,
      valor_em_centavos,
      parcelas,
    });
  },
};
