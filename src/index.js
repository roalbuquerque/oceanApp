import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';

function Item(props) {
  const item = props.item;

  return (
    <a href={'/visualizar/' + item._id}>
      <div className='item'>
        <h1 className='item__title'>{item.nome}</h1>
        <img src={item.imageUrl} alt={item.nome} width='200'></img>
      </div>
    </a>
  );
}

function Lista() {
  console.log('Lista carregada.');

  // useState
  const [listaResultadoApi, atualizarListaResultadoApi] = useState('');

  // useEffect
  useEffect(() => {
    console.log({ listaResultadoApi });

    if (!listaResultadoApi) {
      obterResultado();
    }
  });

  // Declaramos a função para obter resultados
  const obterResultado = async () => {
    console.log('Obter resultado');

    // Fazemos a requisição no Backend
    const resultado = await fetch('https://backend-flexivel.herokuapp.com', {
      headers: new Headers({
        Authorization: 'profpaulo.salvatore@gmail.com',
      }),
    });

    console.log({ resultado });

    const dados = await resultado.json();

    console.log({ dados });
    atualizarListaResultadoApi(dados);
  };

  if (!listaResultadoApi) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='lista'>
      {listaResultadoApi.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </div>
  );
}

function Header() {
  return (
    <header className='header'>
      <a href='/'>
        <img src='https://www.oceanbrasil.com/img/general/logoOceanI.png' alt='Samsung Ocean' width='300' />
      </a>
    </header>
  );
}

function Footer() {
  return <footer className='footer'>Todos os direitos reservados.</footer>;
}

function ListarItens() {
  return (
    <div>
      <Lista />
    </div>
  );
}

function VisualizarItem(props) {
  const id = props.match.params.id;

  /* 
  useState e useEffect
  Fazer uma nova requisição
  Usar o fetch
  async/await 
  */

  const [item, setItem] = useState('');

  useEffect(() => {
    if (!item) {
      getItemData();
    }
  });

  const getItemData = async () => {
    console.log('Get Item Data', id);

    const resultado = await fetch('https://backend-flexivel.herokuapp.com/' + id, {
      headers: new Headers({
        Authorization: 'profpaulo.salvatore@gmail.com',
      }),
    });

    const dados = await resultado.json();

    setItem(dados);
  };

  return (
    <div>
      <Item item={item} />
    </div>
  );
}

function adicionarItem() {
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='nome'>Nome:</label>
        <input type='text' id='nome' />
        <br />

        <label htmlFor='imagemUrl'>URL da Imagem</label>
        <input type='text' id='imagemUrl' />
        <br />

        <input type='submit' value='Adicionar' />
      </form>
    </div>
  );
}

function App() {
  return (
    <div className='app'>
      <Header />
      <Switch>
        <Route path='/' exact={true} component={ListarItens} />

        <Route path='/visualizar/:id' component={VisualizarItem} />

        <Route path='/adicionar' component={adicionarItem} />
      </Switch>
      <Footer />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
