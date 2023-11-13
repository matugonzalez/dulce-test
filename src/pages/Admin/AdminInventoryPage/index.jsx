import './AdminInventoryPage.css'
import React from 'react'
import { useAdminSystem } from '../../../providers/AdminSystem'
import { useState,useEffect } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl } from '@chakra-ui/react'
import { Input, Button, FormLabel} from '@chakra-ui/react';
import axios from 'axios'

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    //modalAdd
    const { isOpen: addModalIsOpen, onOpen: addModalOpen, onClose: addModalClose } = useDisclosure();
    const [newProduct, setNewProduct] = useState({title: "", detail: "", stock: 0});
    //modalEdit
    const { isOpen: editModalIsOpen, onOpen: editModalOpen, onClose: editModalClose } = useDisclosure();
    const [editProduct, setEditProduct] = useState({title: "", detail: "", stock: 0});
    const [editProductId, setEditProductId] = useState();
    //modalDelete
    const { isOpen: deleteModalIsOpen, onOpen: deleteModalOpen, onClose: deleteModalClose } = useDisclosure();
    const [deleteProductId, setDeleteProductId] = useState();

    const addInitialRef = React.useRef(null);
    const editInitialRef = React.useRef(null);

    const [state] = useAdminSystem()

    const fetchDate = () => {
        axios.get(`${state.api.base_path}/inventory`, {
            headers: { Authorization: `Bearer ${state.session.token}`}
        })  
        .then((response) => {
            setProducts(response.data.inventory)
        })
        .catch((error) => {
            console.log('Error', error);
        })
    }

    useEffect(() => {
        fetchDate()
    }, [])
    //search input
    const handleOnChange = (event) => {
        const { value } = event.target;
        setSearchQuery(() => value.replace(/[^0-9-\s]/g, ''));
    };


    //filtrado de productos
    const filteredList = products.filter((product) => {
        if (!searchQuery.length) return true;

        const id = Number(searchQuery);
        if (isNaN(id)) return true

        return product.ingredient_id === id;
    });

    const handleGuardarProduct = () => {
        console.log('here')
            const productData = {
                title: newProduct.title,
                detail: newProduct.detail,
                stock: newProduct.stock
            }
        console.log(productData)
        if (newProduct.title && newProduct.detail && newProduct.stock) {
            const productData = {
                title: newProduct.title,
                detail: newProduct.detail,
                stock: newProduct.stock
            }
        console.log('here inside')
            axios.post(`${state.api.base_path}/inventory`, productData, {
                headers: { Authorization: `Bearer ${state.session.token}` }
            })
            .then(() => {
                addModalClose()
                setNewProduct({
                    title: "",
                    detail: "",
                    stock: 0
                });
                fetchDate()
            })
            .catch((error) => {
                console.log('Error', error);
            })
        }
        else {
            return true;
        }
    }

    //edit
    /*const handleGuardarEdicion = () => { 
        editModalClose()
    }*/
    const handleEditarProduct = (id) => {
        setEditProductId(id)
        const productToEdit = products.find((product) => product.ingredient_id === id)
        if (productToEdit) {
            setEditProduct({
                title: productToEdit.title,
                detail: productToEdit.detail,
                stock: productToEdit.stock,
            })            
        }
        editModalOpen()
    }
    const handleGuardarEdicion = () => { 
        if (editProduct.title && editProduct.detail && editProduct.stock) {
            const dataProduct = {
                title: editProduct.title,
                detail: editProduct.detail,
            }
            axios.put(`${state.api.base_path}/inventory/${editProductId}`, dataProduct, {
                headers: { Authorization: `Bearer ${state.session.token}` }
            })
            .then(() => {
                editModalClose()
                fetchDate()
            })
            .catch((error) => {
                console.log('Error', error);
            })
        }
        else {
            return true;
        }
    }

    //delete
    /*const handleEliminarProduct = () => { 
        deleteModalClose()
    }*/
    const handleEliminarProductId = (id) => {
        setDeleteProductId(id)
        deleteModalOpen()
    }
    const handleEliminarProduct = () => {
        axios.delete(`${state.api.base_path}/inventory/${deleteProductId}`, {
            headers: { Authorization: `Bearer ${state.session.token}` }
        })
        .then(() => {
            deleteModalClose()
            fetchDate()
        })
        .catch((error) => {
            console.log('error', error);
        })
    }

    return (
    <>
    <div className='Inventory'>
        <h1 className='Inventory__title'>Inventario</h1>
        <div className='Inventory__content'>
            <label className='Inventory__filter' htmlFor='inventory_filter_search'>
                <input
                className='Inventory-filter__input'
                type='text'
                id='inventory_filter_search'
                name='inventory_filter_search'
                placeholder='Título o Detalles'
                value={searchQuery}
                onChange={handleOnChange}
                />
            </label>
        <div>
            <Button colorScheme='pink' onClick={addModalOpen}>Añadir</Button>
        </div>
        <div className='Inventory__list'>
            <div className='Inventory-list__item'>
                <span style={{ fontWeight: 'bold' }}>Edit</span>
                <span style={{ fontWeight: 'bold' }}>Borrar</span>
                <span style={{ fontWeight: 'bold' }}>ID</span>
                <span style={{ fontWeight: 'bold' }}>Título</span>
                <span style={{ fontWeight: 'bold' }}>Detalle</span>
                <span style={{ fontWeight: 'bold' }}>Stock</span>
            </div>
            {filteredList.map((product) => (
            <div
            key={product.ingredient_id}
            className='Inventory-list__item'>
                <span>
                    <Button backgroundColor='pink' onClick={() => handleEditarProduct(product.ingredient_id)}>✏️</Button>
                </span>
                <span>
                    <Button backgroundColor='pink' onClick={() => handleEliminarProductId(product.ingredient_id)}>🗑️</Button>
                </span>
                <span>{product.ingredient_id}</span>
                <span>{product.title}</span>
                <span>{product.detail}</span>
                <span>{product.stock}</span>
            </div>
            ))}
        </div>
    </div>
    </div>

    <Modal
        initialFocusRef={addInitialRef}
        isOpen={addModalIsOpen}
        onClose={addModalClose}
        size='xl'
    >
        <ModalOverlay />
        <ModalContent backgroundColor='pink' borderRadius='30px'>
            <ModalHeader>Agregar un nuevo elemento</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Input backgroundColor='white' ref={addInitialRef} placeholder='Título' value={newProduct.title} onChange={(e) => setNewProduct((prev) => ({ ...prev, title: e.target.value }))}/>
                    <FormLabel>Autor</FormLabel>
                    <Input backgroundColor='white' ref={addInitialRef} placeholder='Detalles' value={newProduct.detail} onChange={(e) => setNewProduct((prev) => ({ ...prev, detail: e.target.value }))}/>
                    <FormLabel>Stock total</FormLabel>
                    <Input backgroundColor='white' ref={addInitialRef} placeholder='Stock' value={newProduct.stock} onChange={(e) => setNewProduct((prev) => ({ ...prev, stock: e.target.value }))}/>
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='pink' mr={3} onClick={handleGuardarProduct} >Guardar</Button>
                <Button onClick={addModalClose}>Cancelar</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    <Modal
        initialFocusRef={editInitialRef}
        isOpen={editModalIsOpen}
        onClose={editModalClose}
        size='xl'
    >
        <ModalOverlay />
        <ModalContent backgroundColor='pink' borderRadius='30px'>
            <ModalHeader>Editar producto</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                    < FormLabel>Título</FormLabel>
                    <Input backgroundColor='white' ref={editInitialRef} placeholder='Título' value={editProduct.title}  onChange={(e) => setEditProduct((prev) => ({ ...prev, title: e.target.value }))}/>
                    < FormLabel>Detalle</FormLabel>
                    <Input backgroundColor='white' ref={editInitialRef} placeholder='Nombre autor' value={editProduct.detail}  onChange={(e) => setEditProduct((prev) => ({ ...prev, detail: e.target.value }))}/>
                    < FormLabel>Stock</FormLabel>
                    <Input backgroundColor='white' ref={editInitialRef} placeholder='Stock' value={editProduct.stock}  onChange={(e) => setEditProduct((prev) => ({ ...prev, stock: e.target.stock }))}/>
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='pink' mr={3} onClick={handleGuardarEdicion}>Guardar</Button>
                <Button onClick={editModalClose}>Cancelar</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    <Modal 
        isOpen={deleteModalIsOpen} 
        onClose={deleteModalClose}
        size='xl'
    >
        <ModalOverlay />
        <ModalContent backgroundColor='pink' borderRadius='30px'>
            <ModalHeader>Eliminar producto</ModalHeader>
            <ModalBody fontWeight='bold'>
                ¿Seguro que quieres eliminar este producto?
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='red' onClick={handleEliminarProduct}>Eliminar</Button>
                <Button mr={3} onClick={deleteModalClose}>Cancelar</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    </>
    )
}

export default Inventory;
