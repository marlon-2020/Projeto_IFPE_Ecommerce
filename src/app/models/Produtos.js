const { Sequelize, Model } = require('sequelize');

class produtos extends Model {
  static init(sequelize) {
    super.init(
      {
        nomeProduto: Sequelize.STRING,
        valor: Sequelize.STRING,
        valorOri: Sequelize.STRING,
        valorPar: Sequelize.STRING,
        estoque: Sequelize.STRING,
        imagem: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

module.exports = produtos;
