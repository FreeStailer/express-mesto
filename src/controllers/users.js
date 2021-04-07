const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { handleUserError } = require('../utils/errors');
const { NotFoundError } = require('../utils/notfound-error.js')

const createUser = (req, res) => {
  const { name, about, avatar, email } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar
    }).then((user) => {
      const userData = {
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar
      };
      res.send(userData);
    }).catch((err) => {
      if (err.code === 11000) {
          throw new BadRequestError('Пользователь с таким email уже зарегистрирован');
        } else {
          next(err);
        }
    })).catch((err) => handleUserError(err, res));
  }

const updateUserInfo = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  },{ runValidators: true }).orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserError(err, res));
};

const getUsers = (req, res) => {
  User.find({}).orFail()
    .then((users) => res.status(200).send(users))
    .catch((err) => handleUserError(err, res));
};

const getUser = (req, res) => {
  User.findOne({ _id: req.params.id }).orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => handleUserError(err, res));
};

const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { runValidators: true }).orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserError(err, res));
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  getUsersInfo,
  updateUserInfo,
  updateUserAvatar,
};
