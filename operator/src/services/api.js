const axios = require('axios');

const api = {
  'ws-brand': axios.create({
    baseURL: 'https://ws-brand.herokuapp.com/ws-brands/v1',
  }),
};

module.exports = api;
