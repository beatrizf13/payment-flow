const Cliente = require('../models/Cliente');

module.exports = {
  async store(req, res) {
    const { nome } = req.body;

    if (!nome) {
      return res.status(401).json({ resposta: 'informe o nome do cliente' });
    }

    let user = await Cliente.findOne({ nome });

    if (!user) {
      user = await Cliente.create({ nome });
    }

    return res.json(user);
  },
};
