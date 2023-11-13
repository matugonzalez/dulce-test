import './ClientOrdersPage.css'

import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAdminSystem } from '../../../providers/AdminSystem'
import { TranslateState } from './helpers'

import Steppers from '../../../components/Stepper'
import OrderAccordion from '../../../components/OrderAccordion'
import { Box, Card, CardBody, Heading } from '@chakra-ui/react'


const ClientOrdersPage = () => {
    const [orders, setOrders] = useState([])
    const [anormalFlowStates, setAnormalFlowStates] = useState([])
    const [normalFlowStates, setNormalFlowStates] = useState([])
    const [state] = useAdminSystem()
    const navigate = useNavigate()
    
    useEffect(() => {
        async function getData() {
            try {
                const requests = [
                    axios.get(`${state.api.base_path}/orders/clients/${state.session.user.client_id}`, {
                        headers: { Authorization: `Bearer ${state.session.token}` }
                    }),
                    axios.get(`${state.api.base_path}/orders/states`, {
                        headers: { Authorization: `Bearer ${state.session.token}` }
                    })
                ]

                const responses = await Promise.all(requests)

                const filteredUnusual = responses[1].data.states.filter((v) => !['revising', 'canceled', 'paused'].find((x) => x === v.state))
                const translated = filteredUnusual.map((v) => ({ ...v, state: TranslateState(v.state) }))
                const anormal = responses[1].data.states.filter((v) => ['revising', 'canceled', 'paused'].find((x) => x === v.state))

                setOrders(responses[0].data.orders)
                setAnormalFlowStates(anormal)
                setNormalFlowStates(translated)
            } catch (err) {
                console.error({ getDataError: err })
            }
        }

        getData()
    }, [])

    return (
        <div className="ClientOrdersPage">
            <Heading>Mis Pedidos</Heading>
            <Box 
            borderTop='4px'
            borderBottom='4px'
            borderColor='pink.200'
            backgroundColor='pink.100'
            padding={2}
            display='flex'
            flexDirection='column'
            gap={2}
            height='2xl'
            marginBottom='auto'
            overflowY='auto'
            >
                    {orders.map((v) => {
                        const anormalState = anormalFlowStates.find((x) => x.state_id === v.state_id)
                        const isStateInAnormalFlow = anormalState !== undefined

                        return (
                        <Card className='Cards_body'>
                            <CardBody display='flex' flexDirection='column' gap={2}>
                                {isStateInAnormalFlow
                                    ? <Box 
                                    padding={2}
                                    fontWeight='black'
                                    letterSpacing='wider'
                                    textAlign='center'
                                    textTransform='uppercase'
                                    width='100%'
                                    borderRadius='md'
                                    backgroundColor={
                                        anormalState.state === 'paused' 
                                        ? 'gray.200' 
                                        : anormalState.state === 'revising' 
                                        ? 'yellow.200' 
                                        : 'red.200'}
                                    >{TranslateState(anormalState.state)}</Box> 
                                    : <Steppers steps={normalFlowStates} current={v.state_id} />}
                                <OrderAccordion 
                                order_id={v.order_id}
                                last_state_at={v.last_state_at}
                                onClick={() => {
                                    navigate(`/orders/${v.order_id}`)
                                }}
                                />
                            </CardBody>
                        </Card>
                        )
                    })}
            </Box>
        </div>
    )
}

export default ClientOrdersPage
