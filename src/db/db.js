const Sequelize = require("sequelize");

const sequelize = new Sequelize("peakypay", "root", "34544615", {
  host: "127.17.0.1",
  dialect: "mysql",
  define: {
    timestamps: true,
    //underscored: true,
    //underscoredAll: true,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const user = require("../app/models/User");
const produtos = require("../app/models/Produtos");

const models = {
  User: user.init(sequelize, Sequelize),
  Produtos: produtos.init(sequelize, Sequelize),
};

const db = {
  ...models,
  sequelize,
};

module.exports = db;
