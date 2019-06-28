const express = require("express");
const app = express();
const apiRouter = require("./routes/api");

app.use(express.json());

// app.use("/", (req, res, next) => {
//   console.log("hello");
// });
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  const sqlErrorCodes = { "22P02": "Invalid User ID" };

  if (sqlErrorCodes[err.code]) {
    res.status(400).send({ msg: sqlErrorCodes[err.code] });
  } else next(err);
});

app.use((err, req, res, next) => {
  const codes = {
    404: "Not Found"
  };
  res.status(404).send({ msg: codes[err.code] });

  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "You have an Internal server " });
});

app.all("/*", (req, res, next) => res.status(400).send("Route not found"));
module.exports = app;

// app.use((err, req, res, next) => {
// if (err.code) {
//   if (err.code === "2P502") {
//     return res.status(404).send({ msg: "resource not found" });
//   }
//}
//   console.log(err);
//   if (err.status) return res.status(err.status).send({ msg: err.msg });
// });
