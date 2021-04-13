const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');

router.use('/users*', auth);
router.use('/', usersRouter);
router.use('/cards*', auth);
router.use('/', cardsRouter);
router.use((req, res) => {
  res.status(404).send({ message: 'Page not found'})
});

router.use(
  usersRouter,
  cardsRouter,
);

module.exports = router;
