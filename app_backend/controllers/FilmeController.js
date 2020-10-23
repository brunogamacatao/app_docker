const express = require('express');
const router = express.Router();
const Filme = require('../models/Filme');

// função de middleware para recuperar um filme pelo id
async function getFilme(req, res, next) {
  try {
    res.filme = await Filme.findById(req.params.id)
    if (res.filme === null) {
      return res.status(404).json({ message: 'Nao foi possivel encontrar um filme com o id informado'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }

  next();
}

// inicializa o banco com dados de teste
router.get('/popula', async (req, res) => {
  await new Filme({'nome': 'Jurassic Park', 'diretor': 'Steven Spielberg'}).save();
  await new Filme({'nome': 'Laranja Mecanica', 'diretor': 'Kulbrick'}).save();

  res.status(201).json({"status": "sucesso"});
})

// retorna todos os filmes
router.get('/', async (req, res) => {
  res.json(await Filme.find());
})

// retorna um filme pelo id
router.get('/:id', getFilme, async (req, res) => {
  res.json(res.filme);
})

// cria um filme
router.post('/', async (req, res) => {
  const novoFilme = await new Filme(req.body).save();
  res.status(201).json(novoFilme);
})

// remove um filme
router.delete('/:id', getFilme, async (req, res) => {
  await res.filme.remove();
})

// atualiza um filme pelo id
router.put('/:id', getFilme, async (req, res) => {
  res.filme.nome = req.filme.nome;
  res.filme.diretor = req.filme.diretor;
  const filmeAtualizado = await res.filme.save();
  res.json(filmeAtualizado);
})

module.exports = router;
