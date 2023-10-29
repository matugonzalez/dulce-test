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
        <header>
            <Logo className='HeaderBar__Logo' />
            <nav>
                <Button onClickFunction={() => navigate('/home')}>HOME</Button>
                <Button onClickFunction={() => navigate('/menu')}>MENU</Button>
                <Button onClickFunction={() => navigate('/orders')}>ORDERS</Button>
                <Button onClickFunction={() => navigate('/about-us')}>ABOUT US</Button>
                <Button onClickFunction={() => navigate('/contact')}>CONTACT</Button>
            </nav>
            <div>
                {state.userSession.logged 
                    ? <div>Logged as {state.userSession.loginInfo.username}</div>
                    : <Button onClickFunction={() => navigate('/login')}>Log In</Button>
                }
                <UserLogo className='UserLogo' />
            </div>
        </header>
  )
}

export default HeaderBar
