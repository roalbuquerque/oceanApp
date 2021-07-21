import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const lista = [
  {
    id: 0,
    nome: 'Golden Retriever',
    imageUrl:
      'https://static.wixstatic.com/media/db516d_a7f7619f878f4c29948251d50d7f8de9~mv2.jpg/v1/fill/w_569,h_512,al_c,lg_1,q_80,usm_1.20_1.00_0.01/db516d_a7f7619f878f4c29948251d50d7f8de9~mv2.webp',
  },
  {
    id: 1,
    nome: 'Labrador',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAY-2Y-wO9bl9AibZsnHTcJz_Wi5tzkKuKKqZaXno8xy6SS2A2JQYeMOwshFSfZ1DNPBY&usqp=CAU',
  },
];

function Item(props) {
  const indice = props.indice;
  const item = lista[indice];

  return (
    <div className='item'>
      <h1 className='item__title'>{item.nome}</h1>
      <img src={item.imageUrl} alt={item.nome} width='200'></img>
    </div>
  );
}

function Lista() {
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
      <img src='https://www.oceanbrasil.com/img/general/logoOceanI.png' alt='Samsung Ocean' width='300' />
    </header>
  );
}

function Footer() {
  return <footer className='footer'>Todos os direitos reservados.</footer>;
}

function App() {
  return (
    <div className='app'>
      <Header />
      <Lista />
      <Footer />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
