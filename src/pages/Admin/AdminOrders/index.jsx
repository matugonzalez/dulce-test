import React from 'react'
import './Orders.css'
import { useState,useEffect } from 'react'
import data from './test.json'

const Orders = () => {
  const [pedidos, setPedidos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (data && data.pedidos) {
        setPedidos(data.pedidos);
    }
  }, []);
  //search input
  const handleOnChange = (event) => {
    const { value } = event.target;
    setSearchQuery(() => value.replace(/[^a-zA-Z0-9-\s]/g, ''));
  };
  //filtrado de pedidos
  const filteredList = pedidos.filter((pedido) => {
    if (!searchQuery.length) return true;
    const id = Number(searchQuery);
    if (isNaN(id)) {
      const regExp = new RegExp(`^${searchQuery.toLowerCase()}.*`);
      return !!pedido.estado.toLowerCase().match(regExp)
    }
        return pedido.id === id;
    });
    //More info Button
    const handleInfoButton = () => {
      //lógica del botón "Ver más"
    }
  return (
  <div className='Pedidos'>
    <h1 className='Pedidos__title'>Pedidos</h1>
    <div className='Pedidos__content'>
        <label className='Pedidos__filter' htmlFor='pedidos_filter_search'>
            <input
            className='Pedidos-filter__input'
            type='text'
            id='pedidos_filter_search'
            name='pedidos_filter_search'
            placeholder='Estado'
            value={searchQuery}
            onChange={handleOnChange}
            />
        </label>
        <div className='Pedidos__list'>
            <div className='Pedidos-list__item'>
                <span>ID</span>
                <span>Ver más</span>
                <span>Cliente</span>
                <span>Estado</span>
            </div>
            {filteredList.map((pedido) => (
                <div key={pedido.id} className='Pedidos-list__item'>
                    <span>{pedido.id}</span>
                    <span>
                        <button>➕</button>
                    </span>
                    <span>{pedido.cliente}</span>
                    <span>{pedido.estado}</span>
                </div>
            ))}
        </div>
    </div>
</div>
  )
}

export default Orders