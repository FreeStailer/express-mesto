const User = require('../models/user');

const createUser = (req, res, next) => {
  const data = { ...req.body };
  User.create(data)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(404).send({ message: 'Запрашиваемые данные не найдены' }));
};

const getUser = (req, res) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Нет юзера с таким ИД' });
    }
    return res.status(200).send(user);
  });
};

const updateUserInfo = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Ошибка при обновлении пользователя' }));
};

const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar })
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
