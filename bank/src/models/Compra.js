const { Schema, model } = require('mongoose');

const CompraSchema = new Schema(
  {
    tb_cartao_id: {
      type: Schema.Types.ObjectId,
      ref: 'Cartao',
      required: true,
    },
    valor_em_centavos: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Compra', CompraSchema);
