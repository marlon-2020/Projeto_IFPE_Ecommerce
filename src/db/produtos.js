const db = require("./db");

const Produtos = db.sequelize.define("products", {
  nome_produto: {
    type: db.Sequelize.STRING,
  },
  valor: {
    type: db.Sequelize.STRING,
  },
  valor_orig: {
    type: db.Sequelize.STRING,
  },
  valor_parc: {
    type: db.Sequelize.STRING,
  },
  estoque: {
    type: db.Sequelize.STRING,
  },
  imagem: {
    type: db.Sequelize.STRING,
  },
});

module.exports = Produtos;
