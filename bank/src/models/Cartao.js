const { Schema, model } = require('mongoose');

const CartaoSchema = new Schema(
  {
    tb_cliente_id: {
      type: Schema.Types.ObjectId,
      ref: 'Cliente',
      required: true,
    },
    numero: {
      type: String,
      required: true,
    },
    nome_cliente: {
      type: String,
      required: true,
    },
    bandeira: {
      type: String,
      required: true,
    },
    cod_seguranca: {
      type: String,
      required: true,
    },
    limite_em_centavos: {
      type: Number,
      required: true,
    },
    dia_fechamento_fatura: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Cartao', CartaoSchema);
