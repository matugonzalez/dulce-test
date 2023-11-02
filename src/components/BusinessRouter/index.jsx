import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAdminSystem } from '../../providers/AdminSystem'
import ProtectedRoute from './ProtectedRoute'

// ADMIN PAGES
import AdminOrders from '../../pages/Admin/AdminOrders'
import AdminOrder from '../../pages/Admin/AdminOrder'
import Inventory from '../../pages/Admin/AdminStock'
import Clientes from '../../pages/Admin/AdminClientes'
import Dashboard from '../../pages/Admin/Dashboard'
import Stock from '../../pages/Admin/Stock'

// CLIENT PAGES
import Home from '../../pages/Client/Home'
import Menu from '../../pages/Client/Menu'
import AboutUs from '../../pages/Client/AboutUs'
import ClientOrders from '../../pages/Client/ClientOrders'
import ClientOrder from '../../pages/Client/ClientOrder'

// LOGIN REGISTER PAGES
import Register from '../../pages/RegisterPage'
import LoginPage from '../../pages/LoginPage'

const BusinessRouter = () => {
    const [state] = useAdminSystem()
    const navigate = useNavigate()
    return (
        <Routes>
            {/* ADMIN RELATED ROUTES */}
                {/* LOGIN PROTECTED ROUTES */}
                <Route element={<ProtectedRoute />}>
                    <Route path='/admin'>

                        <Route index path='dashboard' element={<Dashboard  />}/>

                        <Route path='orders'>
                            <Route index element={<AdminOrders />}/>
                            <Route path=':id' element={<AdminOrder />} />
                        </Route>

                        <Route path='stock'>
                            <Route index element={<Inventory />}/>
                            <Route path='new' element={<div>where new stock should go</div>} />
                        </Route>

                        <Route path='menu' element={<Menu />}/>
                        <Route path='users'>
                            <Route index element={<div>where list of users should go</div>}/>
                            <Route path=':id' element={<div>where each user should go</div>}/>
                        </Route>

                        <Route path='clientes'>
                            <Route index element={<Clientes />}/>
                        </Route>
                    </Route>
                </Route>
        
            <Route path='/'>
                <Route index element={<Navigate to='/home'/>} />
                <Route path='home' element={<Home />}/>
                <Route path='about-us' element={<AboutUs />}/>

                <Route element={<ProtectedRoute />}>
                    <Route path='orders'>
                            <Route index element={<ClientOrders />}/>
                            <Route path=':id' element={<ClientOrder />} />
                    </Route>
                
                    <Route path='menu' element={<Menu />}/>

                </Route>
                <Route path='*' element={<h1>404</h1>} />
            </Route>
  
            <Route path='login' element={state.userSession.logged ? <Navigate to='/home'/> : <LoginPage />} />
            <Route path='register' element= {state.userSession.logged ?<Register to='/home'/> : <Register />} />
        </Routes>
        
    )
}

export default BusinessRouter
