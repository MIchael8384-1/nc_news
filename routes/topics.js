const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics");

topicsRouter
  .route("/")
  .get(getTopics)
  .all((req, res) => {
    res.status(405).send({ msg: "Method is not allowed" });
  });

module.exports = topicsRouter;
