import './HeaderBar.css'
import { useAdminSystem } from '../../providers/AdminSystem'
import { useNavigate, NavLink } from 'react-router-dom'
import Logo from '../Logo'
import Button from '../Button'
import UserLogo from '../Icons/UserLogo'
import NavsLinks from '../NavLinks'

const HeaderBar = () => {
    const [state] = useAdminSystem()
    const navigate = useNavigate()
    return (
        <header>
            <nav className='navbar'>
                <Logo className='HeaderBar__Logo' />
                    <div className="navsLink">
                        <NavsLinks to = "/home">HOME</NavsLinks>
                        <NavsLinks to = "/menu">MENU</NavsLinks>
                        <NavsLinks to = "/orders">ORDERS</NavsLinks>
                        <NavsLinks to = "/about-us">ABOUT US</NavsLinks>
                        <NavsLinks to = "/contact">CONTACT</NavsLinks>
                    </div>
                
             </nav>
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
