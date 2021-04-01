const express = require('express');
const mongoose = require('mongoose');
const router = require('./src/routes/index.js');
const { PORT = 3000 } = process.env;
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '605de414ae7d765e77dd857a',
  };
  next();
});

app.use(router);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.get('*', (req, res, next) => {
  res.status(404);
  res.send({ message: 'Ищу там не знаю где, потому что здесь :)' });
  next();
});

app.listen(PORT, () => {
  console.log(`Slushaem radio na volne ${PORT}`);
});
