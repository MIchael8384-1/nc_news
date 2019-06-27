const express = require("express");
const app = express();
const apiRouter = require("./routes/api");

app.use(express.json());

// app.use("/", (req, res, next) => {
//   console.log("hello");
// });
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status) return res.status(err.status).send({ msg: err.msg });
});

module.exports = app;
