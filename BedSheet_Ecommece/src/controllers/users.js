const users = [];

const addUser = (user) => {
  users.push(user);
};

const getUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};

module.exports = { addUser, getUserByEmail, users };
