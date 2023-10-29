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
                <Button onClick={navigate('/home')}>HOME</Button>
                <Button onClick={navigate('/menu')}>MENU</Button>
                <Button onClick={navigate('/orders')}>ORDERS</Button>
                <Button onClick={navigate('/about-us')}>ABOUT US</Button>
                <Button onClick={navigate('/contact')}>CONTACT</Button>
            </nav>
            <div>
                {state.userSession.logged ? <div>Logged as {state.userSession.loginInfo.username}</div> : <Button onClick={navigate('/login')}>Log In</Button>}
                <UserLogo className='UserLogo' />
            </div>
        </header>
  )
}

export default HeaderBar