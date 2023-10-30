import './HeaderBar.css'
import { useAdminSystem } from '../../providers/AdminSystem'
import { useNavigate} from 'react-router-dom'
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
                        {state.userSession.logged ?  <NavsLinks to = "/admin">ADMIN</NavsLinks>
                            : ''
                        }
                        
                    </div>
                
            <div>
                {state.userSession.logged 
                    ? <div className='login_style'>
                        <h4>Logged as {state.userSession.loginInfo.username}</h4>
                        <UserLogo className='UserLogo' />
                      </div>
                    : <Button onClickFunction={() => navigate('/login')}>Log In</Button>
                }
            </div>
            </nav>
        </header>
  )
}

export default HeaderBar
