'use strict';

const {HttpCode} = require(`../../constants`);
const schema = require(`../../constants/schemas/article-schema`);

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const {error} = schema.validate(newArticle, {abortEarly: false});

  if (error) {
    return res.status(HttpCode.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  res.locals.newArticle = newArticle;
  return next();
};
