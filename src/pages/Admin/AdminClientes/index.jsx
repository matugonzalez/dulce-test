import React from 'react'
import './Clientes.css'
import { useState,useEffect } from 'react'
import data from './test.json'
import axios from 'axios'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl } from '@chakra-ui/react'
import { Button, FormLabel} from '@chakra-ui/react';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);    
    const [info, setInfo] = useState({id: 0, fullname: "", cellphone: 0, email: ""})


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
        axios.get('http://localhost:4000/api/orders')
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
            return !!cliente.nombre.toLowerCase().match(regExp)
            //return !!clientes.client.fullname.toLowerCase().match(regExp)
        }
        return pedido.id === id;
        //return clientes.id === id; ¿???
    });

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
                            <div key={cliente.id} className='Clientes-list__item'>
                                <span>{cliente.client.id}</span>
                                <span>{cliente.client.fullname}</span>
                                <span>{cliente.client.cantidad}</span>
                                <span><Button backgroundColor='pink' onClick={() => handleClientInfoId(cliente.id)}>➕</Button></span>
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
                    <FormLabel fontSize='3xl' fontWeight='bold'>ID de cliente:</FormLabel>
                    <FormLabel fontSize='2xl'>info.id</FormLabel>
                    <FormLabel fontSize='3xl' fontWeight='bold'>Nombre de cliente:</FormLabel>
                    <FormLabel fontSize='2xl'>info.fullname</FormLabel>
                    <FormLabel fontSize='3xl' fontWeight='bold'>Cantidad de compras realizadas</FormLabel>
                    <FormLabel fontSize='2xl'>info.cantidad</FormLabel>
                    <FormLabel fontSize='3xl' fontWeight='bold'>Celular de cliente</FormLabel>
                    <FormLabel fontSize='2xl'>info.cellphone</FormLabel>
                    <FormLabel fontSize='3xl' fontWeight='bold'>Mail de cliente:</FormLabel>
                    <FormLabel fontSize='2xl'>info.email</FormLabel>
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