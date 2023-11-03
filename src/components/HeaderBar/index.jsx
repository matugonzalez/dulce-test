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
            {state.userSession.loginInfo === undefined | state.userSession.loginInfo === 'client' 
                ?
                    <div className='navsLink'>
                        <NavsLinks to = "/home">HOME</NavsLinks>
                        <NavsLinks to = "/menu">MENU</NavsLinks>
                        {state.userSession.logged && <NavsLinks to = "/orders">ORDERS</NavsLinks>}
                    </div>
                :
                state.userSession.loginInfo.role === 'admin' 
                    &&
                    <div className='navsLink'>
                        <NavsLinks to = "/admin/menu">MENU</NavsLinks>
                        <NavsLinks to = "/admin/orders">ORDERS</NavsLinks>
                        <NavsLinks to = "/admin/users">USERS</NavsLinks>
                        <NavsLinks to = "/admin/stock">STOCK</NavsLinks>
                    </div> 
            }
                
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