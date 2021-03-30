const User = require('../models/user');

const createUser = (req, res, next) => {
  const data = { ...req.body };
  User.create(data).orFail()
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getUsers = (req, res) => {
  User.find({}).orFail()
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(404).send({ message: 'Запрашиваемые данные не найдены' }));
};

const getUser = (req, res) => {
  User.findOne({ _id: req.params.id }).orFail()
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(404).send({ message: 'Нет юзера с таким ИД' }));
};

const updateUserInfo = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  }).orFail()
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Ошибка при обновлении пользователя' }));
};

const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }).orFail()
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Ошибка при обновлении аватара' }));
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
};
