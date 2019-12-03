const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

const routes = require('./routes');

const app = express();

mongoose.connect(
  'mongodb://beatrizf13:beatrizf13@ds251158.mlab.com:51158/bank',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.json());
app.use(cors());
app.use(logger('dev'));

app.use('/ws-bank/v1', routes);

app.listen(process.env.PORT || 3335);
