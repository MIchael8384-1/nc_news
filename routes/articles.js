const articlesRouter = require("express").Router();
const {
  getArticleById,
  getArticleComments
} = require("../controllers/articles");

//articlesRouter.route("/").get(getArticleById);
articlesRouter.route("/:article_id").get(getArticleById);
articlesRouter.route("/:article_id/comments").get(getArticleComments);

module.exports = articlesRouter;
