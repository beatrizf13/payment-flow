const { Schema, model } = require('mongoose');

const ParcelaSchema = new Schema(
  {
    tb_compra_id: {
      type: Schema.Types.ObjectId,
      ref: 'Compra',
      required: true,
    },
    tb_fatura_id: {
      type: Schema.Types.ObjectId,
      ref: 'Fatura',
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

module.exports = model('Parcela', ParcelaSchema);
