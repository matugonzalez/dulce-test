import './Home.css'
import HeaderBar from '../../../components/HeaderBar'
import itemsArray from './const'
import Carousel from '../../../components/Carousel'

const Home = () => {
    return (
        <div className='Home'>
            <HeaderBar />
            <div className="Home_Frecuent">
                <h1>Frecuently ordered menues</h1>
                <Carousel items={itemsArray}/>
            </div>
            <div className="Home_orderInfo">
                <span>Delivery is agreed by email </span>
                <span>Delivery is agreed by wpp </span>
                <span>Delivery is agreed by email </span>
            </div>

        </div>
    )
}

export default Home