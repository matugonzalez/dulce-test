import './AdminOrders.css'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Spinner,
} from '@chakra-ui/react'
import HeaderBar from '../../../components/HeaderBar'
import data from './tests'
import NavsLinks from '../../../components/NavLinks'


const AdminOrders = () => {

    const [orders, setOrders] = useState([])
    
    useEffect(() => {
        
        /*
        axios.get('/api/orders') 
        .then((res) => {
            if (res.data.found) {
                setOrders(res.data.orders); 
            }
        })
        .catch((err) => console.error(err))
        */

        console.log('fetching and setting...')
        setTimeout(() => {
            if (data.found) {
                setOrders(data.orders)
                console.log('fetched and set')
            }
        }, 3000)

    }, [])

    const handleOnClick = (orderId) => {
        <Navigate to={`/admin/orders/${orderId}`}/>
    }
    return (
        <div className='AdminOrdersPage'> 
            <HeaderBar />
            <div className='AdminOrdersPage_orders'>
                {orders 
                    ?
                        <TableContainer className='AdminOrdersPage_container'>
                            <Table className='AdminOrdersPage_table' variant='striped'>
                                <Thead>
                                    <Tr>
                                        <Th>ID</Th>
                                        <Th>NOMBRE</Th>
                                        <Th>ESTADO</Th>
                                        <Th>FECHA</Th>
                                        <Th>VER</Th>
                                    </Tr>
                                    {orders.map((order)=>{
                                        return(
                                            <Tr key={order.order_id}>
                                                <Td>{order.order_id}</Td>
                                                <Td>{order.fullname}</Td>
                                                <Td>{order.state}</Td>
                                                <Td>{order.created_at.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</Td>
                                                <Td>
                                                    <NavsLinks className='AdminOrders_ordersItem-link' to={`/admin/orders/${order.order_id}`} >VER</NavsLinks>
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Thead>
                            </Table>
                        </TableContainer>
                    : <Spinner/>
                }
            </div>
        </div>
    )
}

export default AdminOrders