const commentsRouter = require("express").Router();
const {
  deleteCommentById,
  patchCommentById
} = require("../controllers/comments");

commentsRouter
  .route("/:comment_id")
  .delete(deleteCommentById)
  .patch(patchCommentById)
  .all((req, res) => {
    res.status(405).send({ msg: "Method is not allowed" });
  });

module.exports = commentsRouter;
