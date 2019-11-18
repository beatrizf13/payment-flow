const axios = require('axios');

const api = {
  'ws-bank': axios.create({
    baseURL: 'http://localhost:3335/ws-bank/v1',
  }),
};

module.exports = api;
