const {
  fetchArticles,
  fetchArticleById,
  fetchArticleComments,
  updateArticleVotes
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

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  let { inc_votes } = req.body;
  updateArticleVotes(article_id, inc_votes)
    .then(article => {
      console.log(article);
      res.status(200).send({ article });
    })
    .catch(next);
};
