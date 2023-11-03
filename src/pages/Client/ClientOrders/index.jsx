import React from 'react'
import './Orders.css'
import HeaderBar from '../../../components/HeaderBar'
import Footer from '../../../components/Footer'
import { Card, CardBody} from '@chakra-ui/react'
import Steppers from '../../../components/Stepper'
import Acordion from '../../../components/Accordion'



const ClientOrders = () => {
  return (
    <>
    <HeaderBar />
      <div className="Orders_Container">
        <div className="Orders_titulo">
          <h1>Mis Pedidos</h1>
        </div>
        <div className="Orders_continer--Cards">
          <div className="Orders_Card">
          <Card className='Cards_body'>
          <CardBody>
            <h1>MI PEDIDO001</h1>
            <Steppers ActiveStep={2}/>
            <Acordion title='Descripcion de mi Pedido' body= 'Mi pedido' />
          </CardBody>
          </Card>
          </div>
        </div>
      </div>

      
    <Footer/>
    </>
  )
}

export default ClientOrders