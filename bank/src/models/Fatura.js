const { Schema, model } = require('mongoose');

const FaturaSchema = new Schema(
  {
    tb_cartao_id: {
      type: Schema.Types.ObjectId,
      ref: 'Cartao',
      required: true,
    },
    data_inicial: {
      type: Date,
      required: true,
    },
    data_final: {
      type: Date,
      required: true,
    },
    data_pagamento: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Fatura', FaturaSchema);
