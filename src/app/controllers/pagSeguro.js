const axios = require("axios");
const pagseguro = require("../../config/config");

module.exports = {
  async setSessionId(req, res) {
    const { email_pagSeguro, token_Sandbox } = pagseguro;
    axios
      .post(
        `https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?email=${email_pagSeguro}&token=${token_Sandbox}`,
        {
          dataType: "json",
          header: {
            "Content-Type": "application/xml; charset=utf-8",
          },
        }
      )
      .then((response) => {
        setSessionId(response.id);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // Renderização da página de Checkout
  async checkout_page(req, res) {

    return res.render("checkout", {
      title: "Checkout Mercado Pago | Peaky Pay",
      checkout: true, // Variável para ativar a renderização handlebars, sem o css do Materialize
    });
  },
};
