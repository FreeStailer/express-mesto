const User = require('../models/user');
const { handleUserError } = require('../utils/errors');

const updateUserInfo = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  }).orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserError(err, res));
};

const createUser = (req, res) => {
  const data = { ...req.body };
  User.create(data).orFail()
    .then((user) => res.status(200).send(user))
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
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }).orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserError(err, res));
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
};
