import './HeaderBar.css'
import { useAdminSystem } from '../../providers/AdminSystem'
import Logo from '../Logo'
import NavsLinks from '../NavLinks'
import Button from '../Button'

const HeaderBar = () => {
    const [state, actions] = useAdminSystem()
    console.log(state.userSession.logged)
    return (
        <header className='HeaderBar'>
            <Logo className='HeaderBar__Logo' />
                <div className='navsLink'>
                    <NavsLinks to = "/home">HOME</NavsLinks>
                    <NavsLinks to = "/menu">MENU</NavsLinks>
                    {state.userSession.logged && <NavsLinks to = "/orders">ORDERS</NavsLinks>}
                    <NavsLinks to = "/about-us">ABOUT US</NavsLinks>
                </div>
                
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
