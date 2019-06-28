const {
  fetchArticles,
  fetchArticleById,
  fetchArticleComments
} = require("../models/articles");

exports.getArticles = (req, res, next) => {
  fetchArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleComments(article_id)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
