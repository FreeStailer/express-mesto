const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/', usersRouter);
router.use('/', cardsRouter);

router.use(
  usersRouter,
  cardsRouter,
);

module.exports = router;
