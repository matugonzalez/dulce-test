import './Dashboard.css'
import { useAdminSystem } from '../../../providers/AdminSystem'
import PreviousPageBT from '../../../components/PreviousPageBT'
import NavsLinks from '../../../components/NavLinks'


const Dashboard = () => {
    const [state] = useAdminSystem()
    
    return (
        <div className='Dashboard'>
            <h1>Welcome {state.userSession.loginInfo.username}</h1>
            <div className='Dashboard_container'>
                <NavsLinks to = '/admin/stock' >STOCK</NavsLinks>
                <NavsLinks to = '/admin/orders' >ORDERS</NavsLinks>
                <NavsLinks to = '/admin/menu' >MENU</NavsLinks>
                <PreviousPageBT />
            </div>
        </div>
        
    )
}

export default Dashboard
