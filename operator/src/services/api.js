const axios = require('axios');

const api = {
  'ws-brand': axios.create({
    baseURL: 'http://localhost:3334/ws-brands/v1',
  }),
};

module.exports = api;
