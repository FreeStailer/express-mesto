const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joy.string().required().min(2).max(30),
    link: Joy.string().required().uri(),
  })
}), createCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joy.object().keys({
    cardId: Joy.string().required().alphanum().length(24)
  })
}), likeCard);

router.delete('/cards/:cardId', celebrate({
  params: Joy.object().keys({
    cardId: Joy.string().required().alphanum().length(24)
  })
}), deleteCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joy.object().keys({
    cardId: Joy.string().required().alphanum().length(24)
  })
}), dislikeCard);

module.exports = router;
