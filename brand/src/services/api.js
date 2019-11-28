const axios = require('axios');

const api = {
  'ws-bank': axios.create({
    baseURL: 'https://ws-bank.herokuapp.com/ws-bank/v1',
  }),
};

module.exports = api;
