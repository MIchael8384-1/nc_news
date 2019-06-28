const connection = require("../db/connection");

//SELECT * FROM users WHERE username = 'butter_bridge';
exports.fetchUserByUsername = username => {
  return connection
    .select("username", "name", "avatar_url")
    .from("users")
    .where({ "users.username": username })
    .then(([user]) => {
      console.log(user);
      if (!user)
        return Promise.reject({
          status: 404,
          msg: "Username not found"
        });
      return user;
    });
};
