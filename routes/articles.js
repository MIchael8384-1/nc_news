const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  getArticleComments
} = require("../controllers/articles");

articlesRouter
  .route("/")
  .get(getArticles)
  .all((req, res) => {
    res.status(405).send({ msg: "Method is not allowed" });
  });

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .all((req, res) => {
    res.status(405).send({ msg: "Method is not allowed" });
  });

articlesRouter
  .route("/:article_id/comments")
  .get(getArticleComments)
  .all((req, res) => {
    res.status(405).send({ msg: "Method is not allowed" });
  });

module.exports = articlesRouter;
