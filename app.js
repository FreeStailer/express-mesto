const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const app = express();
const bodyParser = require('body-parser');
// new modules
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('./src/controllers/users.js');
const auth = require('./src/middlewares/auth.js');
const NotFoundError = require('./src/utils/notfound-error.js');

app.use(bodyParser.json());

const router = require('./src/routes/index.js');

app.use(router);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(auth);
//login and registration maybe otdel'nyi fail v route sdelat'
app.use('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
}), createUser);

app.use(errors());

app.get('*', (req, res, next) => {
  res.status(404);
  res.send({ message: 'Ищу там не знаю где, потому что здесь :)' });
  next();
});

app.listen(PORT, () => {
  console.log(`Slushaem radio na volne ${PORT}`);
});
