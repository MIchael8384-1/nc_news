const express = require("express");
const app = express();
const apiRouter = require("./routes/api");

app.use(express.json());

// app.use("/", (req, res, next) => {
//   console.log("hello");
// });
app.use("/api", apiRouter);

module.exports = app;
