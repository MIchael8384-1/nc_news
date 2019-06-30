const { removeCommentById, addComment } = require("../models/comments");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};

exports.insertNewComment = (req, res, next) => {
  const { author, body } = req.body;
  const { article_id } = req.params;
  const newComment = { author, body, article_id };
  console.log(newComment);
  addComment(newComment);
  then(comment => {
    res.status(201).send({ comment });
  }).catch(next);
};
