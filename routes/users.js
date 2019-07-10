const usersRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/users");

usersRouter
  .route("/:username")
  .get(getUserByUsername)
  .all((req, res) => {
    res.status(405).send({ msg: "Method is not allowed" });
  });

module.exports = usersRouter;
