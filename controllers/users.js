const { fetchUserByUsername, checkExists } = require("../models/users");

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then(user => {
      //console.log(user);
      res.status(200).send({ user });
    })
    .catch(next);
};
//res.status(200).send({ user });
