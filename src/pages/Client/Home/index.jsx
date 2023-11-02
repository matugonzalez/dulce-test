import './Home.css'
import HeaderBar from '../../../components/HeaderBar'
import CarouselCard from '../../../components/CarouselCard'
import itemsCards from './cards'
import { Text, Heading, Box, Card, CardHeader, CardBody, CardFooter, Divider, Center } from '@chakra-ui/react'
import Dividers from '../../../components/Divider'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, fa2, fa3 } from '@fortawesome/free-solid-svg-icons';

import Footer from '../../../components/Footer'


const Home = () => {
    return (
        <div className='Home'>
            <HeaderBar />
            <div className="Home_Container">
                <div className="Home_Title">
                    <h1>Welcome to DolceMika</h1>                 
                </div>
                <div className="Home_AboutMe">
                    <div className="Home_Image">
                    </div>
                   <div className="Home_AboutMe--Texto">
                    <h1>
                        !Hola! Soy Mica<br></br>
                        Estudié cocina y me especializo en
                        hacer cosas dulces
                        Podes ver mi trabajo y contactarme
                        en : @dolcemikaa
                    </h1>
                   </div>
                </div>
                <div className="Home_Ranking">
                        <h1>Ranking</h1>
                        <div className="Home_places">
                            <div className="Home_SecondPlace">
                                <h1><FontAwesomeIcon icon={fa2} bounce /></h1>
                                <Card className='Ranking-card'>
                                    <CardBody>
                                        <Text></Text>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="Home_FirstPlace">
                                <h1><FontAwesomeIcon className='Home_Crown' icon={faCrown} beat /></h1>
                                <Card className='Ranking-card'>
                                    <CardBody>
                                        <Text></Text>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="Home_ThirdPlace">
                                <h1><FontAwesomeIcon icon={fa3} bounce /></h1>
                                <Card className='Ranking-card'>
                                    <CardBody>
                                        <Text></Text>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                </div>
            </div>
            <div className="Home_footer">
            <Footer/>
            </div>
        </div>
    )
}

export default Home