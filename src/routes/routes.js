const Produtos = require('../db/produtos');
const routes = require('express').Router();
const { Sequelize } = require('../db/db');

const Op = Sequelize.Op;

//-----Rota da página inicial-----//
routes.get('/', (req, res) => {
    Produtos.findAll().then(function(produtos){
        res.render('index', {produtos: produtos})
    })
});
//-----Rota da busca-----//
routes.get('/busca', (req, res) => {
    Produtos.findAll({ where:
        {nomeProduto: {
          [Op.like]: `%${req.query.busca}%`
        }
      }
    }).then(function(produtos){
        res.render('index', {produtos : produtos})
    })
});
routes.get('/carrinho', (req, res) => {
    res.render('carrinho')    
});


module.exports = routes;