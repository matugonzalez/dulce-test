import './HeaderBar.css'
import { useAdminSystem } from '../../providers/AdminSystem'
import Logo from '../Logo'
import NavsLinks from '../NavLinks'
import Button from '../Button'

const HeaderBar = ({className}) => {
    const [state, actions] = useAdminSystem()
    //console.log(state.userSession.logged)
    const inputClassName = className === undefined ? '' : className
    return (
        <header className={`HeaderBar ${inputClassName}`}>
            <Logo className='HeaderBar__Logo' />
                <div className='navsLink'>
                    <NavsLinks to = "/home">HOME</NavsLinks>
                    <NavsLinks to = "/menu">MENU</NavsLinks>
                    {state.userSession.logged && <NavsLinks to = "/orders">ORDERS</NavsLinks>}
                </div>
                
            <div>
                {state.userSession.logged 
                    ? 
                    <div className='navsLink'>
                        Logged as {state.userSession.loginInfo.username}
                        <Button onClickFunction={() => {
                            actions.userSession.logOut()
                        }}
                        >
                            LOG OUT
                        </Button>
                        {state.userSession.loginInfo.role === 'admin' && <NavsLinks to='/admin/dashboard'>DASHBOARD</NavsLinks>}
                    </div>
                    : 
                    <div className='navsLink'>
                        <NavsLinks to = "/login">LOG IN</NavsLinks>
                        <NavsLinks to = "/register">REGISTER</NavsLinks>
                    </div>
                }
            </div>
        </header>

  )
}

export default HeaderBar