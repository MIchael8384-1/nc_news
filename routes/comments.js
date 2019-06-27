const commentsRouter = require("express").Router();
const { deleteCommentById } = require("../controllers/comments");

commentsRouter.route("/:comment_id").delete(deleteCommentById);

module.exports = commentsRouter;
