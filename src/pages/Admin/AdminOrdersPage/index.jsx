import './AdminOrders.css'
import { useEffect, useState } from 'react'
import { useAdminSystem  } from '../../../providers/AdminSystem'
import { TranslateState } from '../../Client/ClientOrders/helpers'
import axios from 'axios'
import {
    Table,
    Thead,
    Box,
    Text,
    Tr,
    Th,
    Td,
    TableContainer,
    Spinner,
    Tbody,
} from '@chakra-ui/react'
import NavsLinks from '../../../components/NavLinks'


const AdminOrders = () => {
    const [state] = useAdminSystem()
    const [orders, setOrders] = useState([])
    
    useEffect(() => {
        
        axios.get(`${state.api.base_path}/orders`, {
            headers: { Authorization: `Bearer ${state.session.token}` }
        }) 
        .then((res) => {
            if (res.status === 200) {
                setOrders(res.data.orders); 
                console.log(res)
            }
        })
        .catch((err) => console.error(err))

    }, [])

    return (
        <div className='AdminOrdersPage'> 
            <Text marginTop='auto' fontSize='4xl' fontWeight='bold' color='pink.500'>Pedidos</Text>
            <Box height='xl' width='4xl' margin='auto' fontSize='xl' borderRadius='xl' backgroundColor='pink.50'>
                {orders.length
                    ?
                        <TableContainer className='AdminOrdersPage_container'>
                            <Table className='AdminOrdersPage_table' variant='striped'>
                                <Thead backgroundColor='pink.100'>
                                    <Tr>
                                        <Th>ID CLIENTE</Th>
                                        <Th>ID PEDIDO</Th>
                                        <Th>ESTADO</Th>
                                        <Th>ÚLT. ESTADO</Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {orders.map((order)=>{
                                        return(
                                            <Tr key={order.order_id}>
                                                <Td>{order.client_id}</Td>
                                                <Td>{order.order_id}</Td>
                                                <Td textTransform='capitalize'>{TranslateState(order.state)}</Td>
                                                <Td>{order.last_state_at}</Td>
                                                <Td>
                                                    <NavsLinks to={`/orders/${order.order_id}`}><Text as='span' fontSize='xl' color='pink.800'>Ver</Text></NavsLinks>
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    : <Spinner/>
                }
            </Box>
        </div>
    )
}

export default AdminOrders
