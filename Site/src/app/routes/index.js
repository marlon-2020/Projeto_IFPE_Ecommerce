//------------------configuração das rotas--------------------//
const routes = require('express').Router();
const path = require('path');

//------------------criação das rotas--------------------//

routes.get('/', (req, res) => {
   res.sendFile(path.join(__dirname + '/index.html'));
});
routes.get('/pagina2', (req, res) => {
   res.sendFile(path.join(__dirname + '/pagina2.html'));
});

//------------------exportar módulo--------------------------//
module.exports = routes;