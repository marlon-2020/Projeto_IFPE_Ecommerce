const Cart = require("../models/Carrinho");
const Produtos = require("../models/Produtos");

module.exports = {
  async store(req, res, next) {
    const produtoId = req.params.id;
    const cart = new Cart(req.cookies.cart ? req.cookies.cart : { itens: {} }); // operador condicional (ternário)
    const produto = await Produtos.findByPk(produtoId);

    cart.add(produto.dataValues, produto.dataValues.id); // adiciona o produto ao carrinho

    res.cookie("cart", cart);
    res.redirect("/");
  },
  async destroy(req, res) {
    const produtoID = await req.params.id;
    const cart = new Cart(req.cookies.cart);

    cart.remove(cart.itens[produtoID].preco * cart.itens[produtoID].qnt);
    cart.itens[produtoID] = undefined;

    res.cookie("cart", cart);
    res.redirect("/carrinho");
  },
  async checkout_PgSeguro(req, res) {
    // pendente finalização
    if (!req.cookies.cart) return res.redirect("/carrinho");

    const cart = new Cart(req.cookies.cart);
    return res.render("checkout", {
      title: "Checkout | Peaky Pay",
      css: ["checkout.css", "carrinho.css"],
      totalPreco: cart.totalPreco.toFixed(2),
      produtos: cart.generateArray(),
    });
  },

  // Renderização da Página de Carrinho
  carrinho(req, res) {
    if (!req.cookies.cart)
      return res.render("carrinho", {
        title: "Carrinho | Peaky Pay",
        css: ["style.css", "carrinho.css"],
        produtos: [],
      });

    const cart = new Cart(req.cookies.cart);

    var totalPreco = cart.totalPreco.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    return res.render("carrinho", {
      title: "Carrinho | Peaky Pay",
      css: ["style.css", "carrinho.css"],
      produtos: cart.generateArray(),
      totalPreco: totalPreco,
      totalQnt: cart.totalQnt,
    });
  },
};
