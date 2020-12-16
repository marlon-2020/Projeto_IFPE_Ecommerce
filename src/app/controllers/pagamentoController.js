const mercadopago = require("mercadopago");

const {
  PROD_KEY,
  PROD_TOKEN,
  SAND_KEY,
  SAND_TOKEN,
} = require("../../config/config");

module.exports = {
  async store(req, res) {

    mercadopago.configure({
      access_token: SAND_TOKEN,
    });

    const {
      token,
      description,
      paymentMethodId,
      issuer,
      email,
      docType,
      docNumber,
    } = req.body;

    const payment_data = {
      transaction_amount: 120,
      token: token,
      description: description,
      installments: 2,
      payment_method_id: paymentMethodId,
      issuer_id: issuer,
      payer: {
        email: email,
        identification: {
          type: docType,
          number: docNumber,
        },
      },
    };
    console.log("payment" + payment_data);

    mercadopago.payment
      .save(payment_data)
      .then((response) => {
        responseStatus = response.status;
        res.status(response.status).json({
          status: response.body.status,
          status_detail: response.body.status_detail,
          id: response.body.id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
