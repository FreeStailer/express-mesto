const Card = require('../models/card');
const { handleCardError } = require('../utils/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => handleCardError(err, res));
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => handleCardError(err, res));
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete({ owner: req.user._id, _id: req.params.cardId })
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch((err) => handleCardError(err, res));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch((err) => handleCardError(err, res));
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(() => {
      res.status(200).send({ message: 'Дизлайк!' });
    })
    .catch((err) => handleCardError(err, res));
};

module.exports = {
  getCards,
  createCard,
  likeCard,
  deleteCard,
  dislikeCard,
};
