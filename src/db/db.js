const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', 'msf131906', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}