const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { handleUserError } = require('../utils/errors');
const NotFoundError = require('../utils/notfound-error.js');
const UnauthorizedError = require('../utils/unauthorized-error.js');
const BadRequestError = require('../utils/badrequest-error.js');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }).then((user) => {
      const userData = {
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      };
      res.send(userData);
    }).catch((err) => {
      if (err.code === 11000) {
        throw new BadRequestError('Пользователь с таким email уже зарегистрирован');
      } else {
        next(err);
      }
    })).catch((err) => handleUserError(err, res));
};

const getUserInfo = (req, res) => {
  User.findById(req.user._id).orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => handleUserError(err, res));
};

const getUser = (req, res) => {
  User.findById(req.params.id).orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => handleUserError(err, res));
};

const getUsers = (req, res) => {
  User.find({}).orFail()
    .then((users) => res.status(200).send(users))
    .catch((err) => handleUserError(err, res));
};

const updateUserInfo = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  }, { runValidators: true }).orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserError(err, res));
};

const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserError(err, res));
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      let token;
      try {
        token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      } catch (err) {
        throw new UnauthorizedError('Необходима авторизация');
      }
      res.send({ token });
    })
    .catch((err) => handleUserError(err, res));
};

module.exports = {
  login,
  createUser,
  getUser,
  getUsers,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
};
