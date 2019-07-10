const connection = require("../db/connection");

exports.fetchArticles = ({ sort_by, author, topic, order }) => {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .from("articles")
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(query => {
      if (author) {
        query.where("articles.author", author);
      }
      if (topic) {
        query.where("articles.topic", topic);
      }
    })
    .then(articles => {
      if (!articles[0]) {
        return Promise.reject({
          code: 404
        });
      }
      return articles;
    });
};

exports.fetchArticleById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .where({ "articles.article_id": article_id })
    .count({ comment_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")

    .then(([article]) => {
      if (!article) {
        return Promise.reject({
          code: 404
        });
      }
      return article;
    });
};

exports.fetchArticleComments = (article_id, sort_by, order) => {
  return connection
    .select("*")
    .from("comments")
    .where({ article_id })
    .orderBy(sort_by || "created_at", order || "desc")
    .returning("*");
};

exports.updateArticleVotes = (article_id, inc_votes) => {
  return connection
    .from("articles")
    .where({ article_id })
    .increment("votes", inc_votes)
    .returning("*")
    .then(([article]) => {
      return article;
    });
};
