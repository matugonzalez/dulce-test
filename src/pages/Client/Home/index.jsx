import './Home.css'
import HeaderBar from '../../../components/HeaderBar'
import CarouselCard from '../../../components/CarouselCard'
import itemsCards from './cards'
import { Text, Heading, Box, Card, CardHeader, CardBody, CardFooter, Divider, Center } from '@chakra-ui/react'
import Dividers from '../../../components/Divider'

import Footer from '../../../components/Footer'


const Home = () => {
    return (
        <div className='Home'>
            <HeaderBar />
            <div className="Home_Container">
                <div className="Home_Title">
                    <h1>Welcome to DolceMika</h1>
                </div>
                <div className="Home_welcome">
                    <Text fontSize='3xl' className='Home_Texto'>
                    Hoy, estamos emocionados de compartir un mundo de sabor y dulzura con todos ustedes. En "DolceMika," creamos delicias que no solo satisfacen tu apetito, sino que también hacen que tu día sea más dulce.
                    Nuestros pasteleros están comprometidos con la excelencia, utilizando ingredientes de la más alta calidad para crear pasteles y postres que deleitan los sentidos. Desde lo clásico hasta lo innovador, tenemos algo para todos los gustos.
                    Queremos ser parte de tus momentos especiales y celebrar la vida contigo. Gracias por unirte a nosotros en esta deliciosa aventura. ¡Bienvenidos a "DolceMika"!
                    </Text>
                </div>
                <Dividers/>
                <div className="Home_Frecuent">
                    <h1>Pedidos Frecuentes</h1>
                </div>
                <div className="card_test">
                    <CarouselCard items ={itemsCards}/>
                    <CarouselCard items ={itemsCards}/>
                    <CarouselCard items ={itemsCards}/>
                </div>
                <div className="Home_orderInfo">
                <Card>
                    <CardBody>
                    <Center height='30px'>
                        <Divider orientation='vertical' />
                    </Center>
                    </CardBody>
                </Card>
                </div>
            </div>
            <div className="Home_footer">
                <Footer/>
            </div>
        </div>
    )
}

export default Home