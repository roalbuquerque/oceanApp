import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';

const lista = [
  {
    id: 1,
    nome: 'Pinscher',
    imageUrl: 'https://pbs.twimg.com/media/Da3FmbSWkAEuwUJ.jpg',
  },
  {
    id: 2,
    nome: 'Golden Retriever',
    imageUrl: 'https://f.i.uol.com.br/fotografia/2017/10/27/150912457859f369e28eaa5_1509124578_3x2_md.jpg',
  },
  {
    id: 3,
    nome: 'Labrador',
    imageUrl: 'https://www.clubeparacachorros.com.br/wp-content/uploads/2014/07/labrador-amarelo.jpg',
  },
  {
    id: 4,
    nome: 'Yorkshire',
    imageUrl: 'https://www.petlove.com.br/images/breeds/192471/profile/original/yorkshire-p.jpg?1532539683',
  },
  {
    id: 5,
    nome: 'Husky Siberiano',
    imageUrl: 'https://www.petlove.com.br/images/breeds/193082/profile/original/husky_siberian-p.jpg?1532539123',
  },
];

function Item(props) {
  const indice = props.indice;
  const item = lista[indice];

  return (
    <a href={'/visualizar/' + indice}>
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

    obterResultado();
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
  };

  return (
    <div className='lista'>
      {lista.map((item, index) => (
        <Item indice={index} key={index} />
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
  return (
    <div>
      <Item indice={props.match.params.id} />
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
