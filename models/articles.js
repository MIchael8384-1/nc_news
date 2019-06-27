const connection = require("../db/connection");

exports.fetchArticleById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .where({ "articles.article_id": article_id })
    .count({ comments_count: "comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id");
};

exports.fetchArticleComments = (
  article_id,
  sort_by = "created_at",
  order = "DESC"
) => {
  return connection
    .select("*")
    .from("comments")
    .where({ article_id })
    .orderBy(sort_by, order);
};

/*
  SELECT comment_id, comments.votes, comments.created_at, comments.author, comments.body
  FROM articles
  LEFT JOIN comments
  ON articles.article_id = comments.article_id
  */
