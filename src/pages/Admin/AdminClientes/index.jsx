import React from 'react'
import './Clientes.css'
import { useState,useEffect } from 'react'
import data from './test.json'
import axios from 'axios'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl } from '@chakra-ui/react'
import { Button, FormLabel} from '@chakra-ui/react';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);    
    const [info, setInfo] = useState({id: 0, fullname: "", amount_orders: 0, cellphone: 0, email: "", birthdate: 0})

    const { isOpen, onOpen, onClose } = useDisclosure()
    const InitialRef = React.useRef(null);

    const [searchQuery, setSearchQuery] = useState('');
    /*
    useEffect(() => {
        if (data && data.clientes) {
            setClientes(data.clientes);
        }
    }, []);
    */
    useEffect(() => {
        axios.get('http://localhost:4000/api/orders/clients')
            .then((response) => {
                setClientes(response.data.clientes)
            })
            .catch((error) => {
                console.log('Error', error);
            })
    }, [])
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
            //return !!cliente.nombre.toLowerCase().match(regExp)
            return !!cliente.fullname.toLowerCase().match(regExp)
        }
        //return pedido.id === id;
        return cliente.client_id === id; 
    });
    /*
    const handleClientInfoId = (id) => {
        axios.get(`/api/orders/${id}`)
        .then((response) => {
            setClientes(response.data.clientes)
            setInfo({
                id: clientes.client.id,
                fullname: clientes.client.fullname,
                cellphone: clientes.client.cellphone,
                email: clientes.client.email
            })
            onOpen()
        })
        .catch((error) => {
            console.log('error', error);
        })
    }*/
    /*
    const handleClientInfoId = (id) => {
        axios.get(`/api/orders/${id}`)
        .then((response) => {
            const clientesData = response.data.client
            const cliente = clientesData.find((c) => c.client.id === id )
            if (cliente) {
                const {id, fullname, cellphone, email} = cliente
                setInfo({
                    id,
                    fullname,
                    cellphone,
                    email,
                })
            }
            onOpen()
        })
        .catch((error) => {
            console.log('error', error);
        })
    }
    */
    //la forma correcta en teoría ¿
    const handleClientInfoId = (id) => {
            //const clientesData = clientes
            const cliente = clientes.find((c) => c.client_id === id )
            if (cliente) {
                setInfo({
                    id: cliente.client_id,
                    fullname: cliente.fullname,
                    amount_orders: cliente.amount_orders,
                    cellphone: cliente.cellphone,
                    email: cliente.email,
                    birthdate: cliente.birthdate 
            })
            onOpen()
            }
            
    }

    return (
        <>
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
                            <span style={{ fontWeight: 'bold' }}>ID</span>
                            <span style={{ fontWeight: 'bold' }}>Nombre</span>
                            <span style={{ fontWeight: 'bold' }}>Cantidad de pedidos</span>
                            <span style={{ fontWeight: 'bold'}}>Más Info</span>
                        </div>
                        {filteredList.map((cliente) => (
                            <div key={cliente.client_id} className='Clientes-list__item'>
                                <span>{cliente.client_id}</span>
                                <span>{cliente.fullname}</span>
                                <span>{cliente.amount_orders}</span>
                                <span><Button backgroundColor='pink' onClick={() => handleClientInfoId(cliente.client_id)}>➕</Button></span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        
        <Modal
        initialFocusRef={InitialRef}
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
        >
        <ModalOverlay/>
        <ModalContent backgroundColor='pink' alignItems='center' borderRadius='30px'>
            <ModalHeader fontSize='4xl' fontWeight='bold'>Información del usuario</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel fontSize='3xl' fontWeight='bold'>ID del cliente:</FormLabel>
                    <FormLabel fontSize='2xl'>{info.id}</FormLabel>
                    <FormLabel fontSize='3xl' fontWeight='bold'>Nombre del cliente:</FormLabel>
                    <FormLabel fontSize='2xl'>{info.fullname}</FormLabel>
                    <FormLabel fontSize='3xl' fontWeight='bold'>Cantidad de compras realizadas</FormLabel>
                    <FormLabel fontSize='2xl'>{info.amount_orders}</FormLabel>
                    <FormLabel fontSize='3xl' fontWeight='bold'>Celular del cliente</FormLabel>
                    <FormLabel fontSize='2xl'>{info.cellphone}</FormLabel>
                    <FormLabel fontSize='3xl' fontWeight='bold'>Mail del cliente:</FormLabel>
                    <FormLabel fontSize='2xl'>{info.email}</FormLabel>
                    <FormLabel fontSize='3xl' fontWeight='bold'>Cumpleaños del cliente:</FormLabel>
                    <FormLabel fontSize='2xl'>{info.birthdate}</FormLabel>
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='pink' onClick={onClose}>Aceptar</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
        </>
        );
}

export default Clientes;