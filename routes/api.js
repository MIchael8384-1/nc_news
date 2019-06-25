const apiRouter = require("express").Router();
const topicsRouter = require("../routes/topics");

// apiRouter.use("/", (req, res, next) => {
//   console.log("api Router");
// });

apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;
