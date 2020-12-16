const validatorCPF = require("ygovalidatorcpf-lib");
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { nome, email, cpf } = req.body;

    // validação de cpf
    if (!validatorCPF(cpf)) {
      return res.render("register", {
        title: "Cadastro | Peake Pay",
        css: ["register.css"],
        nome: nome,
        email: email,
        cpf: cpf,
        message_error: "CPF não cadastrado no Cadastro de Pessoas Físicas",
      });
    }

    // Verifica se já existe o e-mail cadastrado
    const emailExists = await User.findOne({
      where: { email: email },
    });

    // se o usuário já existir, retorna a mensagem de erro
    if (emailExists) {
      return res.render("register", {
        title: "Cadastro | Peake Pay",
        css: ["register.css"],
        nome: nome,
        email: email,
        cpf: cpf,
        message_error: `Erro ao cadastrar, e-mail já cadastrado`,
      });
    }

    // Verifica se já existe o CPF cadastrado
    const cpfExists = await User.findOne({ where: { cpf: cpf } });

    // se o usuário já existir, retorna a mensagem de erro
    if (cpfExists) {
      return res.render("register", {
        title: "Cadastro | Peake Pay",
        css: ["register.css"],
        nome: nome,
        email: email,
        cpf: cpf,
        message_error: `Erro ao cadastrar, CPF já cadastrado`,
      });
    }

    await User.create(req.body); // Usuário cadastrado

    return res.render("login", {
      title: "Login | Peaky Pay",
      css: ["login.css"],
      message_sucess: "Usuário cadastrado com sucesso",
    });
  },

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    // Verificação de email para identificar se usuário já existe
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists)
        return res.status(400).json({ message_error: "Usuário já existe." });
    }

    // Somente checka o password se o usuário informar a senha antiga
    if (oldPassword && !(await user.checkPassword(oldPassword)))
      return res.status(401).json({ message_error: "Senha não corresponde." });

    const { id, nome, cpf } = await user.update(req.body);

    return res.json({ id, nome, email, cpf });
  },

  // Renderização de páginas
  register(req, res) {
    return res.render("register", {
      title: "Cadastro | Peake Pay",
      css: ["register.css"],
    });
  },

  login(req, res) {
    return res.render("login", {
      title: "Login | Peaky Pay",
      css: ["login.css"],
    });
  },
};
