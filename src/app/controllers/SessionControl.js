const jwt = require("jsonwebtoken");

const auth = require("../../config/authenticate");
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    // verificação de usuário
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.render("login", {
        title: "Login | Peaky Pay",
        css: ["login.css"],
        email: email,
        message_error: "O usuário não foi encontrado",
      });

    // verificando se o password não bate
    if (!(await user.checkPassword(password)))
      return res.render("login", {
        title: "Login | Peaky Pay",
        css: ["login.css"],
        email: email,
        message_error: "A senha não corresponde",
      });

    // Se chegou até aqui, deu tudo certo.

    const { id } = user;

    const token = jwt.sign({ id }, auth.secret, {
      expiresIn: auth.expiresIn,
    });

    res.cookie("token", token);
    return res.redirect("/");
  },
};
