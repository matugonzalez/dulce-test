import './ClientOrderPage.css'

import axios from 'axios'
import { useAdminSystem } from '../../../providers/AdminSystem'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TranslateState } from '../ClientOrders/helpers'
import { Box, Spinner, Text } from '@chakra-ui/react'

const ClientOrderPage = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [state] = useAdminSystem()
    const navigate = useNavigate()

    useEffect(() => {
        if (!id || isNaN(Number(id))) {
            navigate(-1)
            return
        }

        axios.get(`${state.api.base_path}/orders/${id}`, {
            headers: { Authorization: `Bearer ${state.session.token}`}
        })
        .then((res) => {
            if (res.status === 200) {
                setOrder(res.data.order)
            }
        })
        .catch((err) => {
            console.error({ getOrderById: err })
        })
    }, [])

    if (order === null) return (
        <div className='ClientOrderPage'>
            <Box width='90%' display='flex' flexDirection='column' gap={4}>
                <Box 
                flexGrow='1'
                flexShrink='0'
                flexBasis='auto'
                display='flex'
                flexDirection='column'
                padding={2}
                borderRadius='xl'
                backgroundColor='pink.100'
                height='max-content'
                marginTop='auto'
                alignItems='center'
                justifyContent='center'
                >
                    <Spinner size='lg' />
                </Box>
                <Box 
                flexGrow='1'
                flexShrink='0'
                flexBasis='auto'
                display='flex'
                flexDirection='column'
                padding={2}
                borderRadius='xl'
                backgroundColor='pink.100'
                height='xl'
                alignItems='center'
                justifyContent='center'
                marginBottom='auto'
                >
                    <Spinner size='xl' />
                </Box>
            </Box>
        </div>
    )

    return (
        <div className='ClientOrderPage'>
            <Box width='90%' display='flex' flexDirection='column' gap={4}>
                <Box 
                flexGrow='1'
                flexShrink='0'
                flexBasis='auto'
                display='flex'
                flexDirection='column'
                padding={2}
                borderRadius='xl'
                backgroundColor='pink.100'
                height='max-content'
                marginTop='auto'
                alignItems='center'
                justifyContent='center'
                >
                    <Box
                    width='100%'
                    color='pink.900'
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    justifyContent='space-between'
                    fontSize='4xl'
                    fontWeight='bold'
                    >
                        <Text>#{order.order_id}</Text>
                        <Text>${order.total_price}</Text>
                    </Box>
                </Box>

                <Box 
                flexGrow='1'
                flexShrink='0'
                flexBasis='auto'
                display='flex'
                flexDirection='column'
                gap={2}
                padding={2}
                borderRadius='xl'
                backgroundColor='pink.100'
                height='xl'
                alignItems='center'
                justifyContent='center'
                marginBottom='auto'
                >
                    <Box
                    marginRight='0'
                    marginLeft='auto'
                    marginBottom='0'
                    textTransform='capitalize'
                    backgroundColor='pink.200'
                    padding={2}
                    borderRadius='lg'
                    >
                        <Text 
                        fontSize='2xl'
                        fontWeight='semibold'
                        >Estado: {TranslateState(order.state)}</Text>
                    </Box>
                    <Box 
                    display='flex'
                    flexDirection='column'
                    fontSize='4xl'
                    color='pink.900'
                    marginBottom='auto'
                    marginRight='auto'
                    marginLeft='0'
                    border='4px'
                    width='100%'
                    borderColor='pink.900'
                    borderRadius='xl'
                    padding={2}
                    height='100%'
                    >
                        <Text fontWeight='bold'>Menu del pedido</Text>
                        <Box
                        display='flex'
                        flexDirection='column'
                        gap={2}
                        flexGrow='1'
                        flexShrink='0'
                        flexBasis='auto'
                        overflowY='scroll'
                        paddingRight='2'
                        >
                            {order.menu.map((v, i) => (
                                <Box 
                                padding={2}
                                borderRadius='lg'
                                backgroundColor='pink.900'
                                color='pink.100'
                                >
                                    <Text>{i + 1}. {v.body}</Text>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box
                    marginRight='auto'
                    marginLeft='0'
                    marginBottom='0'
                    padding={2}
                    borderRadius='lg'
                    >
                        <Text 
                        fontSize='2xl'
                        fontWeight='semibold'
                        >Última actualización de estado: {order.last_state_at?.toLocaleString()}</Text>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default ClientOrderPage
