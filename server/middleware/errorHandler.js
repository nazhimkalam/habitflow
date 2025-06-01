// server/middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err.message);
  res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;
