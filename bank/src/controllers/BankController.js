module.exports = {
  // Envia para o NaNBank os dados da compra e cartão para cadastro da despesa no cadastro do cliente.
  async store(req, res) {
    const {
      // numero_cartao,
      nome_cliente,
      // bandeira,
      // cod_seguranca,
      valor_em_centavos,
      parcelas,
    } = req.body;

    // o cliente possui limite no cartão de crédito?

    return res.json({
      resposta: 'sucesso',
      nome_cliente,
      valor_em_centavos,
      parcelas,
    });
  },
};
