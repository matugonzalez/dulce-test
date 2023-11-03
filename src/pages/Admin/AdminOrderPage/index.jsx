import './AdminOrderPage.css'
import HeaderBar from '../../../components/HeaderBar'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import data from '../AdminOrdersPage/tests'
import { Spinner } from '@chakra-ui/react'
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
} from '@chakra-ui/react'

const AdminOrderPage = () => {
    const [order, setOrder] = useState()
    let {orderId} = useParams() 
    
   useEffect(() => {
    //     axios.get(`/api/orders/${orderId}`)
    //     .then((res) => {
    //         if (res.data.found) {
    //             setOrder(res.data.order);
    //         }else {
    //             console.log(res.data.message) 
    //         }
    //     })
    //     .catch((err) => console.error(err))

        console.log('fetching and setting order...')
        setTimeout(() => {
            if (data.found) {
                setOrder(data.orders[orderId-1])
                console.log('fetched and set order')
            }
        }, 3000)

    }, [])

    return (
        <div className='AdminOrderPage'>
            <HeaderBar />
            <div className="AdminOrderMain">
                <div className="AdminOrderContainer">
                    {order 
                    ?
                        <>
                            <span>nombre: {order.fullname}</span>
                            <br/>
                            <span>detalle: {order.detail}</span>
                        </>
                    :
                    <Spinner />
                    }
                </div>
                <div className="OrderState">

                </div>
            </div>
        </div>
    )
}

export default AdminOrderPage