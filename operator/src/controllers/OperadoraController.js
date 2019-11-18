const operadoras = require('./operadoras.json');

const api = require('../services/api');

module.exports = {
  // envia a solicitação para pagamento via cartão de crédito a operadora de cartão
  async store(req, res) {
    const { operadora } = req.params;

    const {
      numero_cartao,
      nome_cliente,
      bandeira,
      cod_seguranca,
      valor_em_centavos,
      parcelas,
      cod_loja,
    } = req.body;

    // a operadora requisitada existe? 🤔
    if (!operadoras.autorizadas.includes(operadora)) {
      return res.status(401).json({
        resposta: 'falha',
        detalhes: 'Operadora não existe',
        operadora,
      });
    }

    // a operadora requisitada trabalha com a loja informada? 🤔
    if (!operadoras[operadora].lojas_autorizadas.includes(cod_loja)) {
      return res.status(401).json({
        resposta: 'falha',
        detalhes: 'Loja não autorizada',
        operadora,
        cod_loja,
      });
    }

    // a operadora requisitada trabalha com a bandeira informada? 🤔
    if (!operadoras[operadora].bandeiras_autorizadas.includes(bandeira)) {
      return res.status(401).json({
        resposta: 'falha',
        detalhes: 'Bandeira não autorizada',
        operadora,
        bandeira,
      });
    }

    // a bandeira do cartão aceita a quantidade de parcelas informadas? 🤔
    try {
      const response = await api['ws-brand'].get(
        `/installments-limit/${bandeira}`
      );

      const { limite_parcelas } = response.data;

      if (parcelas > limite_parcelas) {
        return res.status(401).json({
          resposta: 'falha',
          detalhes: 'Limite de parcelas ultrapassado',
          bandeira,
          parcelas_solicitadas: parcelas,
          limite_parcelas,
        });
      }
    } catch (err) {
      return res.status(err.response.status).send(err.response.data);
    }

    // tudo ok, pode comprar 👍
    try {
      const response = await api['ws-brand'].post(`/pay/${bandeira}`, {
        numero_cartao,
        nome_cliente,
        bandeira,
        cod_seguranca,
        valor_em_centavos,
        parcelas,
        cod_operadora: operadora,
      });

      return res.json(response.data);
    } catch (err) {
      return res.status(err.response.status).send(err.response.data);
    }
  },
};
