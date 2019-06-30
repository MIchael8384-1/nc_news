const commentsRouter = require("express").Router();
const {
  deleteCommentById,
  patchCommentById
} = require("../controllers/comments");

commentsRouter
  .route("/:comment_id")
  .delete(deleteCommentById)
  .patch(patchCommentById);

module.exports = commentsRouter;
