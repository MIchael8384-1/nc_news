const {
  removeCommentById,
  addComment,
  updateCommentsVote
} = require("../models/comments");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};

exports.insertNewComment = (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;
  const newComment = { author: username, body, article_id };
  addComment(newComment)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateCommentsVote(comment_id, inc_votes)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};
