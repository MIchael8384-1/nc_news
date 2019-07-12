exports.handling400 = (err, req, res, next) => {
  const codes = {
    "22P02": "Invalid ID",
    "42703": "Invalid query",
    "23502": "Bad Request"
  };

  if (codes[err.code]) {
    res.status(400).send({ msg: codes[err.code] });
  } else next(err);
};

exports.handling404 = (err, req, res, next) => {
  const codes = { 404: "Not Found" };

  if (codes[err.code]) {
    res.status(404).send({ msg: codes[err.code] });
  } else next(err);
};

// Making this work
exports.handling422 = (err, req, res, next) => {
  const codes = {
    "23503": "Does Not Exist"
  };
  if (codes[err.code]) {
    res.status(422).send({ msg: codes[err.code] });
  } else next(err);
};

exports.handling500 = (req, res) => {
  res.status(500).send({ msg: "You have an Internal server error" });
};
