const routes = require("express").Router();

const User = require("../app/controllers/UserControl");
const Session = require("../app/controllers/SessionControl");
const Products = require("../app/controllers/Products");

const Carrinho = require("../app/controllers/Carrinho");
const pagSeguro = require("../app/controllers/pagSeguro");
const Pagamento = require("../app/controllers/pagamentoController");

const authMiddleware = require("../app/middlewares/auth");

//----- Rotas para o Usuário -----//
routes.post("/users", User.store); // Cadastro de usuário
routes.post("/sessions", Session.store); // Criando Sessão
routes.put("/users", authMiddleware, User.update); // Editar cadastro

//----- Rotas de Produtos -----//
routes.get("/busca", Products.filter); // Rota de busca
routes.post("/produto", Products.store); // Adicionar produto

routes.get("/add-carrinho/:id", Carrinho.store); // Adicionar produto ao carrinho
routes.get("/drop-produto/:id", Carrinho.destroy); // remover produto do carrinho

routes.get("/checkout", Carrinho.checkout_PgSeguro);

// Pendente finalização - api mercado pago
routes.post("/session_ps", pagSeguro.setSessionId);
routes.post("/process_payment", Pagamento.store);

//----- Renderização das Páginas com Handlebars -----//
routes.get("/", Products.index); // Página Inicial

routes.get("/login", User.login); // Página de Login
routes.get("/register", User.register); // Página de Registro

routes.get("/carrinho", Carrinho.carrinho); // Página de Carrinho
routes.get("/checkout", pagSeguro.checkout_page); // Página de Checkout

module.exports = routes;
