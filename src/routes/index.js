const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');

router.use('/users*', auth);
router.use('/', usersRouter);
router.use('/cards*', auth);
router.use('/', cardsRouter);

router.use(
  usersRouter,
  cardsRouter,
);

module.exports = router;
