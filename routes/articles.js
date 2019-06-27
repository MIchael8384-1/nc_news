const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  getArticleComments
} = require("../controllers/articles");

articlesRouter.route("/").get(getArticles);
articlesRouter.route("/:article_id").get(getArticleById);
articlesRouter.route("/:article_id/comments").get(getArticleComments);

module.exports = articlesRouter;
