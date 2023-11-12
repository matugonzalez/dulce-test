import './HeaderBar.css'

import { useAdminSystem } from '../../../providers/AdminSystem'

import Logo from '../../Logo'
import NavsLinks from '../../NavLinks'
import Button from '../../Button'

const UnauthHeaderBar = (passedProps) => {
    const defaultProps = { className: '' }
    const props = !passedProps ? defaultProps : { ...defaultProps, ...passedProps }

    return (
        <header className={`HeaderBar ${props.className}`}>
            <Logo className='HeaderBar__Logo' />
            <nav>
                <NavsLinks to='/home'>HOME</NavsLinks>
                <NavsLinks to='/menu'>MENU</NavsLinks>
                <NavsLinks to='/login'>INGRESAR</NavsLinks>
                <NavsLinks to='/register'>REGISTRO</NavsLinks>
            </nav>
        </header>
    )
}

const ClientHeaderBar = (passedProps) => {
    const defaultProps = { className: '' }
    const props = !passedProps ? defaultProps : { ...defaultProps, ...passedProps }
    const [_, actions] = useAdminSystem()

    return (
        <header className={`HeaderBar ${props.className}`}>
            <Logo className='HeaderBar__Logo' />
            <nav>
                <NavsLinks to='/home'>HOME</NavsLinks>
                <NavsLinks to='/menu'>MENU</NavsLinks>
                <NavsLinks to='/orders'>PEDIDOS</NavsLinks>
                <Button onClickFunction={actions.session.logOut}>SALIR</Button>
            </nav>
        </header>
    )
}

const AdminHeaderBar = (passedProps) => {
    const defaultProps = { className: '' }
    const props = !passedProps ? defaultProps : { ...defaultProps, ...passedProps }

    return (
        <header className={`HeaderBar ${props.className}`}>
            <Logo className='HeaderBar__Logo' />
            <nav>
                <NavsLinks to='/clients'>CLIENTES</NavsLinks>
                <NavsLinks to='/menu'>MENU</NavsLinks>
                <NavsLinks to='/orders'>PEDIDOS</NavsLinks>
                <NavsLinks to='/inventory'>INVENTARIO</NavsLinks>
                <Button onClickFunction={actions.session.logOut}>SALIR</Button>
            </nav>
        </header>
    )
}

export { UnauthHeaderBar, ClientHeaderBar, AdminHeaderBar }

