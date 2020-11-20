//------------------configuração servidor--------------------//
const express = require('express');
const app = express();
//------------------requisitando rotas-----------------------//
const routes = require('../app/routes/index');
const path = require('path');

app.use('/', routes);
app.use('/pagina2', routes)
app.use(express.static(path.join(__dirname, 'public')));

//------------------exportar módulo--------------------------//
module.exports = app;