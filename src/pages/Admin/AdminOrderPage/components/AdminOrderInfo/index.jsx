import './AdminOrderInfo.css'
import { formatDate } from '../../helpers'
import { Spinner } from '@chakra-ui/react'

const AdminOrderInfo = ({order}) => {

    return (
        <div className="AdminOrderInfo">
            {order && order.created_at
                ?
                    <>
                        <h1>Pedido #{order.order_id}</h1>
                        <span><b>Detalle del pedido:</b> {order.detail}</span>
                        <span><b>Precio total del pedido:</b> ${order.total_price}</span>
                        <span><b>Fecha de creación:</b> {formatDate(order.created_at)}</span>
                        <span><b>Hora de creación:</b> {order.created_at.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                        <h1>Usuario</h1>
                        <span><b>Nombre completo:</b> {order.fullname}</span>
                        <span><b>E-mail:</b> {order.email}</span>
                        <span><b>Teléfono:</b> {order.cellphone}</span>
                    </>
                :
                    <>
                        <h1>Cargando...</h1>
                        <Spinner className='Spinner' size='xl'/>
                    </>
            }
        </div>
    )
}
export default AdminOrderInfo
