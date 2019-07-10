const connection = require("../db/connection");

exports.removeCommentById = comment_id => {
  return connection
    .delete()
    .from("comments")
    .where({ comment_id })
    .then(deleteCount => {
      if (!deleteCount) {
        return Promise.reject({
          code: 404
        });
      }
    });
};

exports.addComment = ({ author, body, article_id }) => {
  return connection
    .into("comments")
    .insert({ author, body, article_id })
    .returning("*")
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({
          code: 400
        });
      }
      return comment;
    });
};

exports.updateCommentsVote = (comment_id, inc_votes) => {
  return connection
    .from("comments")
    .where({ comment_id })
    .increment("votes", inc_votes)
    .returning("*")
    .then(([updateVote]) => {
      if (!updateVote) {
        return Promise.reject({
          code: 404
        });
      }
      return updateVote;
    });
};
