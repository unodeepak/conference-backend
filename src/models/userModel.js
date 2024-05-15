const sequelize = require("../config/db/config.js");
const { DataTypes } = require("sequelize");

const Users = sequelize.define("users", {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, required: true, unique: true },
  password: { type: DataTypes.STRING, required: true },
});

// Users.beforeCreate((user, option) => {
//   if (user.email) {
//     user.email = user.email.toLowercase();
//   }
// })

// Users.beforeUpdate((user, option) => {
//   if (user.email) {
//     user.email = user.email.toLowercase();
//   }
// })

module.exports = Users;