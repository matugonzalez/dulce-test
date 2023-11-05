import './AdminOrderPage.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import HeaderBar from '../../../components/HeaderBar'
import AdminOrderInfo from './components/AdminOrderInfo'
import AdminOrderStates from './components/AdminOrderStates'
import { getLastState, getNextState, getStateId } from './helpers'

//MOCK DATA
import data from '../AdminOrdersPage/ordersMock'
import {data0, data1} from './statesMock'


const AdminOrderPage = () => { 
    const [order, setOrder] = useState()
    const [orderStates, setOrderStates] = useState([])
    const [states, setStates] = useState([])
    const [pauseButton, setPauseButton] = useState('pause')
    let {orderId} = useParams() 
    console.log((getLastState(orderStates))?.state)

    const fetchData = async () => {
        try {
            const requests = [
                axios.get(`/api/orders/${orderId}`), 
                axios.get(`/api/orders/${orderId}/states`),
                axios.get(`/api/orders/states`)
            ]
    
            const responses = await Promise.all(requests)
    
            if(!responses[0].data.found || !responses[1].data.found || !responses[2].data.found) return
    
            setOrder(responses[0].data.order)
            setOrderStates(responses[1].data.states)
            setStates(responses[2].data.states)
        }
        catch (err){
            console.log(err.message)
        }
    }

    
    const advanceState = () => {
        const nextState = getNextState(orderStates).state
        const nextStateId = getStateId(nextState, states)
        axios.post(`/api/orders/${orderId}/states/${nextStateId}`)
        .then((res) =>{
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const pauseState = () => {
        const pausedStateId = getStateId('paused', states)
        const startedStateId = getStateId('started', states)
        const lastState = getLastState(orderStates).state
        if (lastState === 'paused') {
            axios.post(`/api/orders/${orderId}/states/${startedStateId}`)
            .then((res) =>{
                console.log(res)
            })
            .catch((err) => {
                console.log(err.message)
            })
        } else {
            axios.post(`/api/orders/${orderId}/states/${pausedStateId}`)
            .then((res) =>{
                console.log(res)
            })
            .catch((err) => {
                console.log(err.message)
            })
        }
    }
    const cancelState = () => {
        const cancelStateId = getStateId('canceled', states)
        axios.post(`/api/orders/${orderId}/states/${cancelStateId}`)
        .then((res) =>{
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
        /*
        */
    }
    useEffect(() => {
        fetchData()
        
        /*
        console.log('fetching and setting order...')
        setTimeout(() => {
            if (data.found) {
                setOrder(data.orders[orderId-1])
                console.log('fetched and set order')
            }
            if (data0.found) {
                setOrderStates(data0.states)
                console.log('fetched and set order state')
            }
            
        }, 500)
        */
        
    }, [])

    return (
        <div className='AdminOrderPage'>
            <HeaderBar />
            <div className="AdminOrderMain">
                <AdminOrderInfo order={order} />
                <AdminOrderStates orderStates={orderStates} />
            </div>
            <div className='AdminOrderButtons'>
                {((getLastState(orderStates))?.state && ((getLastState(orderStates))?.state !== 'canceled') || ((getLastState(orderStates))?.state !== 'finished'))
                    &&
                    <>
                    <button 
                    className='--advance' 
                    onClick={() => {
                        window.confirm('Estas seguro que quieres avanzar al siguiente estado?') ? advanceState() : alert('Estado de pedido no avanzado.')
                    }
                    }
                    >
                    AVANZAR
                    </button>
                    
                    <button 
                    className={`--${pauseButton}`} 
                    onClick={()=> {
                        
                        if (window.confirm(`Estas seguro que quieres ${pauseButton === 'pause' ? 'pausar' : 'despausar'} el pedido?`)) {
                            
                            setPauseButton(prev => prev === 'pause' ? 'unpause' : 'pause')
                            pauseState()
                        } else {
                            alert('Pedido no pausado.')
                        }
                    }}
                    >
                    {pauseButton === 'pause' ? 'pausar' : 'despausar'}
                    </button>
                    
                    <button 
                    className='--cancel' 
                    onClick={()=>{
                        
                        window.confirm('Estas seguro que quieres cancelar el pedido?') ? cancelState() : alert('Pedido no cancelado.')
                    }}
                    >
                    CANCELAR
                    </button>
                    </>
                }
            </div>
        </div>
    )
}

export default AdminOrderPage