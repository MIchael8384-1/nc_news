const connection = require("../db/connection");

//SELECT * FROM users WHERE username = 'butter_bridge';
exports.fetchUserByUsername = () => {
  return connection.select("username", "name", "avatar_url").from("users");
};
