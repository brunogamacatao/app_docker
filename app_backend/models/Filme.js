const mongoose = require('mongoose');

const filmeSchema = new mongoose.Schema({
  nome: String,
  diretor: String
});

module.exports = mongoose.model('Filme', filmeSchema);
