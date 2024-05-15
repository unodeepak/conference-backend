const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("TFG", "root", "", {
  host: "localhost",
  port: 3307,
  dialect: "mysql",
  // dialectModule: mysql2,
});

sequelize
  .sync({ after: true })
  .then(() => {})
  .catch((error) => {});

module.exports = sequelize;
