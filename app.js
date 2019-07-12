const express = require("express");
const app = express();
const apiRouter = require("./routes/api");
const {
  handling400,
  handling404,
  handling422,
  handling500
} = require("./errors/index");

app.use(express.json());

app.use("/api", apiRouter);

app.use(handling400);

app.use(handling404);

app.use(handling422);

app.use(handling500);

app.all("/*", (req, res, next) => res.status(404).send("Route not found"));
module.exports = app;
