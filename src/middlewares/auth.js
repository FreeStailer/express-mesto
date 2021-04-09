const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/unauthorized-error.js');

const auth = (req, res) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(new UnauthorizedError('Необходима авторизация'));
      return;
    }
    const token = authorization.replace('Bearer ', '');
    let payload;
  
    try {
      payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
      next(new UnauthorizedError('Необходима авторизация'));
      return;
    }
    req.user = payload;
    next();
  };

module.exports = { auth }