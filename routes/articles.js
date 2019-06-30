const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  getArticleComments,
  patchArticleById
} = require("../controllers/articles");
const { insertNewComment } = require("../controllers/comments");

articlesRouter
  .route("/")
  .get(getArticles)
  .all((req, res) => {
    res.status(405).send({ msg: "Method is not allowed" });
  });

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all((req, res) => {
    res.status(405).send({ msg: "Method is not allowed" });
  });

articlesRouter
  .route("/:article_id/comments")
  .get(getArticleComments)
  .post(insertNewComment)
  .all((req, res) => {
    res.status(405).send({ msg: "Method is not allowed" });
  });

module.exports = articlesRouter;
