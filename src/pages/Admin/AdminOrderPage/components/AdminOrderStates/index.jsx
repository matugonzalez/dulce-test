import './AdminOrderStates.css'
import { Spinner } from '@chakra-ui/react'
import { formatDate } from '../../helpers'

const AdminOrderStates = ({orderStates}) => {
    
    return (
        <div className='AdminOrderStates'>
            {orderStates.length === 0 
            ?
                <>
                    <h1>Cargando...</h1>
                    <Spinner className='Spinner' size={'xl'}/>
                </>
            :
                <>
                    <h1>Estados del pedido: </h1>
                    {orderStates.map((states, index)=>{
                        var stateTime = states.created_at.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                        var stateDMY = formatDate(states.created_at)
                        return(

                            <span key={index}>
                                Pasó a <b>{states.state}</b> el <b>{stateDMY}</b> a las <b>{stateTime}</b>
                            </span>
                        )
                    })}
                </>
            }
        </div>
    )
}
export default AdminOrderStates
