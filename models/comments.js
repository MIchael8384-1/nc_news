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
