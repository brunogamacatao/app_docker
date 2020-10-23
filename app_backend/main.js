// Lê os dados do arquivo .env
require('dotenv').config();

// Bibliotecas
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Constantes
const PORTA = parseInt(process.env.PORTA);
const DATABASE_URL = process.env.DATABASE_URL;

// Conexão do banco de dados
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
  console.log('Conectado ao banco de dados');
  console.log('Configurando e iniciando o servidor ...');

  // Configuração do servidor
  const app = express();
  app.use(cors()); // permite requisições CORS de qualquer host
  app.use(express.json()); // se o corpo da requisição é json, popula um objeto req.body com seu valor
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  // Adiciono as rotas ao servidor
  app.use('/filmes', require('./controllers/FilmeController'));

  // Inicialização do servidor
  app.listen(PORTA, () => {
    console.log('Servidor rodando em http://localhost:' + PORTA);
  });
});