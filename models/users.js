const connection = require("../db/connection");

//SELECT * FROM users WHERE username = 'butter_bridge';
exports.fetchUserByUsername = username => {
  return connection
    .select("username", "name", "avatar_url")
    .from("users")
    .where({ "users.username": username })
    .then(([user]) => {
      if (!user) return Promise.reject({ code: 404 });
      return user;
    });
};
