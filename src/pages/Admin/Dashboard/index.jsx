import './Dashboard.css'
import { useAdminSystem } from '../../../providers/AdminSystem'
import PreviousPageBT from '../../../components/PreviousPageBT'
import NavsLinks from '../../../components/NavLinks'
import Button from '../../../components/Button'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [state] = useAdminSystem()
    const navigate = useNavigate()

    return (
        <div className='Dashboard'>
            <h1>Welcome {state.userSession.loginInfo.username}</h1>
            <div className='Dashboard_container'>
                <Button className='Home_linkButton' onClickFunction={() => navigate('/admin/stock')}><span>STOCK</span></Button>
                <Button className='Home_linkButton' onClickFunction={() => navigate('/admin/orders')}><span>ORDERS</span></Button>
                <Button className='Home_linkButton' onClickFunction={() => navigate('/admin/clientes')}><span>CLIENTES</span></Button>
                <Button className='Home_linkButton' onClickFunction={() => navigate('/admin/menu')}><span>MENU</span></Button>
                <PreviousPageBT />
            </div>
        </div>
    )
}

export default Dashboard
