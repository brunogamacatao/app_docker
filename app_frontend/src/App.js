import React, {useEffect, useState} from 'react';
import axios from 'axios';

const formVazio = () => {
  return {
    nome: '',
    diretor: ''
  };
};

function App() {
  const urlBackend = process.env.REACT_APP_URL_BACKEND;
  const [filmes, setFilmes] = useState([]);
  const [form, setForm] = useState(formVazio());

  const carregaFilmes = () => {
    axios.get(urlBackend + '/filmes').then((res) => {
      setFilmes(res.data);
    });
  };

  useEffect(() => {
    carregaFilmes();
  }, [urlBackend]);

  const setValor = (evento, campo) => {
    setForm({...form, [campo]: evento.target.value});
  }; 

  const renderFilme = (filme) => {
    return (
      <li key={filme._id}>{filme.nome} - {filme.diretor}</li>
    );
  };

  const salvar = (e) => {
    e.preventDefault();
    axios.post(urlBackend + '/filmes', form).then((res) => {
      carregaFilmes();
      setForm(formVazio());
    });
  };

  return (
    <>
      <h1>Catálogo de Filmes</h1>
      <h3>Formulário</h3>
      <form onSubmit={(e) => salvar(e)}>
        <p>
          <label>Nome:</label>
          <input value={form.nome} onChange={(e) => setValor(e, 'nome')}/>
        </p>
        <p>
          <label>Diretor:</label>
          <input value={form.diretor} onChange={(e) => setValor(e, 'diretor')}/>
        </p>
        <p>
          <input type="submit" value="Salvar"/>
        </p>
      </form>
      <hr/>
      <h3>Listagem de Filmes</h3>
      <ul>
        { filmes.map(renderFilme) }
      </ul>
    </>
  );
}

export default App;
