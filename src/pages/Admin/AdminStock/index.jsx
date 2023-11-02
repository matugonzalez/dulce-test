import React from 'react'
import './Stock.css'
import { useState,useEffect } from 'react'
import data from './test.json'

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    //modalDelete
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null)
    //modalEdit
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDetalle, setEditedDetalle] = useState('');
    const [editedStock, setEditedStock] = useState(0);
    //modalAdd
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newProductTitle, setNewProductTitle] = useState('');
    const [newProductDetalle, setNewProductDetalle] = useState('');
    const [newProductStock, setNewProductStock] = useState(0);
    
    useEffect(() => {
        if (data && data.products) {
        setProducts(data.products);
    }
    }, []);
    //search input
    const handleOnChange = (event) => {
        const { value } = event.target;
        setSearchQuery(() => value.replace(/[^a-zA-Z0-9-\s]/g, ''));
    };
    //filtrado de productos
    const filteredList = products.filter((product) => {
        if (!searchQuery.length) return true;
        const id = Number(searchQuery);
        if (isNaN(id)) {
        const regExp = new RegExp(`^${searchQuery.toLowerCase()}.*`);
        return !!product.titulo.toLowerCase().match(regExp) || !!product.detalle.toLowerCase().match(regExp);
    }
        return product.id === id;
    });
    //delete modal
    const openModal = (product) => {
        setIsModalOpen(true);
        setProductToDelete(product);
    };
    const closeModal = () => {
        setIsModalOpen(false);
      //setProductToDelete(null);
    };
    const handleDelete = () => {
      //logica del botón Eliminar
    
    }

    //edit modal
    const openEditModal = (product) => {
        setIsEditModalOpen(true);
        setProductToEdit(product);
        setEditedTitle(product.titulo);
        setEditedDetalle(product.detalle);
        setEditedStock(product.stock);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setProductToEdit(null);
    }
    const handleEdit = () => {
      //logica del botón Editar
    
    }

    //add modal
    const openAddModal = () => {
        setIsAddModalOpen(true);
    };
    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setNewProductTitle('');
        setNewProductDetalle('');
        setNewProductStock(0);
    };
    const handleAdd = () => {
        //logica del botón Añadir
    
    }

    /*Modales*/

    //delete
    const Modal = ({ isOpen, onClose }) => {
        if (!isOpen) return null;
        return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Eliminar de inventario</h2>
                <p>¿Estás seguro de que deseas eliminar este elemento de inventario</p>
                <div className="button-container">
                    <button onClick={onClose}>Cancelar</button>
                    <button>Eliminar</button>
                </div>

            </div>
        </div>
        );
    };

    //edit  
    const ModalEdit = ({isOpen, onClose}) => {
        if (!isOpen) return null;
        return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar</h2>
                <label>
                    Título:
                    <input
                    type='text'
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
                </label>
                <label>
                    Detalles:
                    <input
                    type='text'
                    value={editedDetalle}
                    onChange={(e) => setEditedDetalle(e.target.value)}
                />
                </label>
                <label>
                    Stock:
                    <input
                    type='number'
                    value={editedStock}
                    onChange={(e) => setEditedStock(e.target.value)}
                />
                </label>
                <div className="button-container">
                    <button onClick={onClose}>Cancelar</button>
                    <button>Guardar</button>
                </div>

            </div>
        </div>
    )
    }

    const ModalAdd = ({ isOpen, onClose }) => {
        if (!isOpen) return null;
        return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Añadir</h2>
                <label>
                    Título:
                    <input
                    type="text"
                    value={newProductTitle}
                    onChange={(e) => setNewProductTitle(e.target.value)}
                />
                </label>
                <label>
                    Detalles:
                    <input
                    type="text"
                    value={newProductDetalle}
                    onChange={(e) => setNewProductDetalle(e.target.value)}
                />
                </label>
                <label>
                    Stock:
                    <input
                    type="number"
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(e.target.value)}
                />
                </label>
                <div className="button-container">
                    <button onClick={onClose}>Cancelar</button>
                    <button>Guardar</button>
                </div>

            </div>
        </div>
    )
    }

    return (
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
            <button className='Inventory_Add' onClick={openAddModal}>Añadir</button>
        </div>
        <div className='Inventory__list'>
            <div className='Inventory-list__item'>
                <span>Edit</span>
                <span>Borrar</span>
                <span>ID</span>
                <span>Título</span>
                <span>Detalle</span>
                <span>Stock</span>
            </div>
            {filteredList.map((product) => (
            <div
            key={product.id}
            className='Inventory-list__item'>
                <span>
                    <button onClick={() => openEditModal(product)}>✏️</button>
                </span>
                <span>
                    <button onClick={() => openModal(product)}>🗑️</button>
                </span>
                <span>{product.id}</span>
                <span>{product.titulo}</span>
                <span>{product.detalle}</span>
                <span>{product.stock}</span>
            </div>
            ))}
        </div>
    </div>
    <Modal isOpen={isModalOpen} onClose={closeModal} />
    <ModalEdit isOpen={isEditModalOpen} onClose={closeEditModal}/>
    <ModalAdd isOpen={isAddModalOpen} onClose={closeAddModal}/>
    </div>
    )
}

export default Inventory;