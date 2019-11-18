const bandeiras = require('./bandeiras.json');

const api = require('../services/api');

module.exports = {
  // Verifica a quantidade permitida de parcelas em uma compra a partir da bandeira informada.
  async index(req, res) {
    const { bandeira } = req.params;

    if (!bandeiras.autorizadas.includes(bandeira)) {
      return res.status(401).json({
        resposta: 'erro',
        detalhes: 'A bandeira informada não existe',
      });
    }

    return res.json({
      bandeira,
      limite_parcelas: bandeiras[bandeira].max_parcelas,
      operadores_permitidos: {
        'op-01': bandeiras[bandeira].operadores_permitidos.includes('op-01'),
        'op-02': bandeiras[bandeira].operadores_permitidos.includes('op-02'),
        'op-03': bandeiras[bandeira].operadores_permitidos.includes('op-03'),
      },
    });
  },

  // Envia para a bandeira do cartão a solicitação de pagamento.
  async store(req, res) {
    const { bandeira } = req.params;

    const {
      numero_cartao,
      nome_cliente,
      // bandeira,
      cod_seguranca,
      valor_em_centavos,
      parcelas,
      cod_operadora,
    } = req.body;

    // a bandeira do cartão aceita trabalhar com o operador requisitante? 🤔
    if (!bandeiras[bandeira].operadores_permitidos.includes(cod_operadora)) {
      return res.status(401).json({
        cod_resposta: 'operadora-negada',
        resposta: 'falha',
        detalhes: 'Operadora sem relação com a bandeira',
        cod_operadora,
      });
    }

    // tudo ok, manda pro banco 👍
    try {
      const respose = await api['ws-bank'].post('/pay', {
        numero_cartao,
        nome_cliente,
        bandeira,
        cod_seguranca,
        valor_em_centavos,
        parcelas,
      });

      return res.json(respose.data);
    } catch (err) {
      return res.status(err.response.status).send(err.response.data);
    }
  },
};
