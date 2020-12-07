const db = require('./db')

const Produtos = db.sequelize.define('produtos', {
    nomeProduto: {
        type: db.Sequelize.STRING
    },
    valor: {
        type: db.Sequelize.STRING
    },
    valorOri: {
        type: db.Sequelize.STRING
    },
    valorPar: {
        type: db.Sequelize.STRING
    },
    estoque: {
        type: db.Sequelize.STRING
    },
    imagem: {
        type: db.Sequelize.STRING
    }
})

module.exports = Produtos;