import './HeaderBar.css'
import { useAdminSystem } from '../../providers/AdminSystem'
import { useNavigate } from 'react-router-dom'
import Logo from '../Logo'
import Button from '../Button'
import UserLogo from '../Icons/UserLogo'

const HeaderBar = () => {
    const [state] = useAdminSystem()
    const navigate = useNavigate()
    return (
        <header className='HeaderBar'>
            <Logo className='HeaderBar__BrandLogo' />
            <div className='HeaderBar__BTSet'>
                <Button onClickFunction={() => navigate('/home')}>HOME</Button>
                <Button onClickFunction={() => navigate('/menu')}>MENU</Button>
                <Button onClickFunction={() => navigate('/orders')}>ORDERS</Button>
                <Button onClickFunction={() => navigate('/contact')}>CONTACT</Button>
            </div>
            <div>
                {state.userSession.logged 
                    ? <div>Logged as {state.userSession.loginInfo.username}</div>
                    : 
                    <div className='HeaderBar__BTSet'>
                        <Button onClickFunction={() => navigate('/login')}>Log In</Button>
                        <Button onClickFunction={() => navigate('/register')}>Register</Button>
                    </div>
                }
            </div>
        </header>
  )
}

export default HeaderBar
