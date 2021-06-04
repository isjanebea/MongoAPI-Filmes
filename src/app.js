
/******* DEPENDEICIAS */
const express =  require('express');
const cors = require('cors');
/****** rotas */

const homeApi = require('./routers/home');
const filmes = require('./routers/filmes.js')

/***** CONFIGURANCO O AMBIENTE DEV */require('dotenv').config();


 const db = require('./database/banco');
/* conectando ao banco */ db.connect();


// ------------------------
const app = express();

/*** Só aceita requisições Body ***/ app.use(express.json())
/*** Deixando a API externa **/ app.use(cors())


app.use("/", homeApi)
app.use("/api", filmes)


module.exports = app;