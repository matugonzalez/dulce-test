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
    const [states, setStates] = useState([])
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

                setOrders(responses[0].data.orders)
                setStates(translated)
            } catch (err) {
                console.error({ getDataError: err })
            }
        }

        getData()
    }, [])

    return (
        <div className="ClientOrdersPage">
            <Heading>Mis Pedidos</Heading>
            <Box backgroundColor='pink.100'>
                    {orders.map((v) => (
                        <Card className='Cards_body'>
                            <CardBody display='flex' flexDirection='column' gap={2}>
                                <Steppers steps={states} current={v.state_id} />
                                <OrderAccordion 
                                order_id={v.order_id}
                                last_state_at={v.last_state_at}
                                onClick={() => {
                                    navigate(`/orders/${v.order_id}`)
                                }}
                                />
                            </CardBody>
                        </Card>
                    ))}
            </Box>
        </div>
    )
}

export default ClientOrdersPage
