import './AdminOrderPage.css'

import axios from 'axios'
import { useAdminSystem } from '../../../providers/AdminSystem'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import AdminOrderInfo from './components/AdminOrderInfo'

import { Box, Text, Button, Spinner } from '@chakra-ui/react'

import { TranslateState } from '../../Client/ClientOrders/helpers'

const AdminOrderPage = () => { 
    let { id } = useParams() 

    const [order, setOrder] = useState()
    const [orderStates, setOrderStates] = useState([])
    const [isPushingState, setIsPushingState] = useState(false)

    const [state] = useAdminSystem()

    const fetchData = async () => {
        try {
            const requests = [
                axios.get(`${state.api.base_path}/orders/${id}`, {
                    headers: { Authorization: `Bearer ${state.session.token}` }
                }), 
                axios.get(`${state.api.base_path}/orders/${id}/states`, {
                    headers: { Authorization: `Bearer ${state.session.token}` }
                }), 
            ]
    
            const responses = await Promise.all(requests)
    
            if(!responses[0].status === 200) return

            setOrder(responses[0].data.order)
            setOrderStates(responses[1].data.states)
        }
        catch (err){
            console.log(err.message)
        }
    }

    const PushNextState = () => {
        if (isPushingState) return;
        setIsPushingState(true)

        axios.post(`${state.api.base_path}/orders/${id}/states/next`, {}, {
            headers: { Authorization: `Bearer ${state.session.token}` }
        })
        .then((res) => {
            if (res.status === 201) {
                fetchData()
            }
        })
        .catch((err) => {
            console.error({ pushStateError: err })
        })
        .finally(() => {
            setIsPushingState(false)
        })
    }

    const PushPausedState = () => {
        if (isPushingState) return;
        setIsPushingState(true)

        axios.post(`${state.api.base_path}/orders/${id}/states/paused`, {}, {
            headers: { Authorization: `Bearer ${state.session.token}` }
        })
        .then((res) => {
            if (res.status === 201) {
                fetchData()
            }
        })
        .catch((err) => {
            console.error({ pushStateError: err })
        })
        .finally(() => {
            setIsPushingState(false)
        })
    }

    const PushCanceledState = () => {
        if (isPushingState) return;
        setIsPushingState(true)

        axios.post(`${state.api.base_path}/orders/${id}/states/canceled`, {}, {
            headers: { Authorization: `Bearer ${state.session.token}` }
        })
        .then((res) => {
            if (res.status === 201) {
                fetchData()
            }
        })
        .catch((err) => {
            console.error({ pushStateError: err })
        })
        .finally(() => {
            setIsPushingState(false)
        })
    }

    const PushRevisingState = () => {
        if (isPushingState) return;
        setIsPushingState(true)

        axios.post(`${state.api.base_path}/orders/${id}/states/revising`, {}, {
            headers: { Authorization: `Bearer ${state.session.token}` }
        })
        .then((res) => {
            if (res.status === 201) {
                fetchData()
            }
        })
        .catch((err) => {
            console.error({ pushStateError: err })
        })
        .finally(() => {
            setIsPushingState(false)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const isNotFinished = orderStates.length === 0 || (orderStates.length > 0 && (orderStates[orderStates.length - 1].state !== 'finished' && orderStates[orderStates.length - 1].state !== 'canceled'))

    return (
        <div className='AdminOrderPage'>
            <AdminOrderInfo order={order} />
            <Box marginBottom='auto' height='xs' width='6xl' display='flex' flexDirection='row' gap={2}>
                <Box flexGrow='0' flexShrink='0' flexBasis='60%' padding={2} borderRadius='xl' display='flex' flexDirection='column' alignItems='center' backgroundColor='pink.100' overflowY='auto'>
                    {orderStates.map((v) => (
                        <Box width='100%' display='flex' flexDirection='row' fontSize='xl' borderBottom='2px' color='pink.900' borderColor='currentcolor'>
                            Pasó a <Text fontWeight='bold' paddingLeft={2} paddingRight={2}>{TranslateState(v.state)}</Text>
                            a las <Text fontWeight='bold' paddingLeft={2} paddingRight={2}>{(new Date(v.created_at)).toLocaleTimeString()}</Text>
                            en <Text fontWeight='bold' paddingLeft={2} paddingRight={2}>{(new Date(v.created_at)).toLocaleDateString()}</Text>
                        </Box>
                    ))}
                </Box>
                {isNotFinished &&
                <Box flex='1' flexShrink='1' flexBasis='auto' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                    <Text fontSize='2xl' fontWeight='bold'>Estado</Text>
                    <Box width='50%' flexGrow='1' flexShrink='1' flexBasis='auto' display='flex' flexDirection='column' justifyContent='space-evenly'>
                        <Button onClick={PushNextState} colorScheme='green'>Siguiente</Button>
                        <Button onClick={PushPausedState} colorScheme='blue'>Pausar</Button>
                        <Button onClick={PushRevisingState} colorScheme='yellow'>Poner en revisión</Button>
                        <Button onClick={PushCanceledState} colorScheme='red'>Cancelar</Button>
                    </Box>
                </Box>
                }
            </Box>
        </div>
    )
}

export default AdminOrderPage
