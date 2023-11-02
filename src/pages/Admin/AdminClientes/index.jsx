import React from 'react'
import './Clientes.css'
import { useState,useEffect } from 'react'
import data from './test.json'
import axios from 'axios'

const Clientes = () => {
    const [clientes, setClientes] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (data && data.clientes) {
            setClientes(data.clientes);
        }
    }, []);
    /*
    useEffect(() => {
        axios.get('api/orders')
            .then((response) => {
                setClientes(response.data.clientes)
            })
            .catch((error) => {
                console.log('Error', error);
            })
    }, [])
    */
    //search input
    const handleOnChange = (event) => {
        const { value } = event.target;
        setSearchQuery(() => value.replace(/[^a-zA-Z0-9-\s]/g, ''));
    };
    //filtrado de clientes
    const filteredList = clientes.filter((cliente) => {
        if (!searchQuery.length) return true;
    
        const id = Number(searchQuery);
        if (isNaN(id)) {
            const regExp = new RegExp(`^${searchQuery.toLowerCase()}.*`);
            return !!cliente.nombre.toLowerCase().match(regExp)
        }
        return pedido.id === id;
    });

    /* 
    return !!clientes.client.fullname.toLowerCase().match(regExp)

    return clientes.id === id; ¿???
    */

    return (
            <div className='Clientes'>
                <h1 className='Clientes__title'>Clientes</h1>
                <div className='Clientes__content'>
                    <label className='Clientes__filter' htmlFor='clientes_filter_search'>
                        <input
                        className='Clientes-filter__input'
                        type='text'
                        id='clientes_filter_search'
                        name='clientes_filter_search'
                        placeholder='Nombres'
                        value={searchQuery}
                        onChange={handleOnChange}
                        />
                    </label>
                    <div className='Clientes__list'>
                        <div className='Clientes-list__item'>
                            <span>ID</span>
                            <span>Nombre</span>
                            <span>Cantidad de pedidos</span>
                        </div>
                        {filteredList.map((cliente) => (
                            <div key={cliente.id} className='Clientes-list__item'>
                                <span>{cliente.id}</span>
                                <span>{cliente.nombre}</span>
                                <span>{cliente.cantidad}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
}
/*
<span>{cliente.client.fullname}</span>
<span>{cliente.cantidad}</span> ¿???
*/
export default Clientes;