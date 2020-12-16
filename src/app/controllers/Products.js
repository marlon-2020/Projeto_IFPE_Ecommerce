const Produtos = require("../models/Produtos");
const  Sequelize  = require('sequelize');

const Op = Sequelize.Op;
module.exports = {
  async index(req, res) {
    // Página Inicial

    await Produtos.findAll()
    .then((response) => {
        return res.render("index", {
          title: "Home | Peaky Pay",
          css: ["style.css"],
          produtos: response,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.render("index", {
          title: "Home | Peaky Pay",
          css: ["style.css"],
          produtos: [],
          message_error: "Erro ao carregar produtos do servidor.",
        });
      });
  },
  async filter(req, res) {
    // Rota de busca

    Produtos.findAll({
      where: {
        nomeProduto: {
          [Op.like]: `%${req.query.busca}%`,
        },
      },
    })
      .then((response) => {
        return res.render("index", {
          title: "Home | Peaky Pay",
          css: ["style.css"],
          produtos: response,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.render("index", {
          title: "Home | Peaky Pay",
          css: ["style.css"],
          produtos: [],
          message_error: "Erro ao buscar o produto.",
        });
      });
  },
  async store(req, res) {
    // Adicionar produto
    const {
      nome: nomeProduto,
      valor,
      valorAnterior: valorOri,
      valorParcelado: valorPar,
      estoque,
      imagemURL: imagem,
    } = req.body;

    const product = await Produtos.create({
      nomeProduto,
      valor,
      valorOri,
      valorPar,
      estoque,
      imagem,
    });

    return res.json(product);
  },
};
