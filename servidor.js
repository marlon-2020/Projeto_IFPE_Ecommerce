const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");

const routes = require(`./src/routes/routes`);

const app = express();

require("./src/db/db");

// template engine config
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname + "/src", "public")));

app.use("/", routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor está ativo na porta ${port}`);
});
