module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("produtos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nomeProduto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valorOri: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      valorPar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estoque: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      imagem: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("produtos");
  },
};
