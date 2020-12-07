const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname+"/src", 'public')));


const port = 3000;
const handlebars  = require('express-handlebars'); 
const routes = require('../Servidor/src/routes/routes');


app.engine('handlebars', handlebars({defaultLayout:'main',
                                        runtimeOptions: {
                                            allowProtoPropertiesByDefault: true,
                                            allowProtoMethodsByDefault: true,
                                        }
                                    }));
app.set('view engine', 'handlebars');

app.use('/', routes);

app.listen(port, () => {
    console.log(`Servidor está ativo na porta ${port}`)
})
