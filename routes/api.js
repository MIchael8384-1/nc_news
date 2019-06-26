const apiRouter = require("express").Router();
const topicsRouter = require("../routes/topics");
const usersRouter = require("./users");

// apiRouter.use("/", (req, res, next) => {
//   console.log("api Router");
// });

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
