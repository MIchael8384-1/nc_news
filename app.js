const express = require("express");
const app = express();
const apiRouter = require("./routes/api");
const { handling400, handling404, handling500 } = require("./errors/index");

app.use(express.json());

// app.use("/", (req, res, next) => {
//   console.log("hello");
// });
app.use("/api", apiRouter);

app.use(handling400);

app.use(handling404);

app.use(handling500);

app.all("/*", (req, res, next) => res.status(404).send("Route not found"));
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
