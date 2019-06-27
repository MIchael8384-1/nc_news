const apiRouter = require("express").Router();
const topicsRouter = require("../routes/topics");
const usersRouter = require("./users");
const articlesRouter = require("./articles");
const commentsRouter = require("./comments");

// apiRouter.use("/", (req, res, next) => {
//   console.log("api Router");
// });

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
