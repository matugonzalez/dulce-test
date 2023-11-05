import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { useAdminSystem } from '../../providers/AdminSystem'
import ProtectedRoute from './ProtectedRoute'

// ADMIN PAGES
import AdminOrders from '../../pages/Admin/AdminOrders'

import Dashboard from '../../pages/Admin/Dashboard'
import Stock from '../../pages/Admin/Stock'
import AdminMenuPage from '../../pages/Admin/AdminMenuPage'
import Inventory from '../../pages/Admin/AdminStock'
import Clientes from '../../pages/Admin/AdminClientes'

// CLIENT PAGES
import Home from '../../pages/Client/Home'
import AboutUs from '../../pages/Client/AboutUs'
import ClientOrders from '../../pages/Client/ClientOrders'
import ClientOrder from '../../pages/Client/ClientOrder'

// LOGIN REGISTER PAGES
import Register from '../../pages/RegisterPage'
import LoginPage from '../../pages/LoginPage'

const BusinessRouter = () => {
    const [state] = useAdminSystem()
    const  {orderId}  = useParams()
    return (
        <Routes>
            {/* ADMIN RELATED ROUTES */}
                {/* LOGIN PROTECTED ROUTES */}
                <Route element={<ProtectedRoute />}>
                    <Route path='/admin'>

                        <Route index path='dashboard' element={<Dashboard  />}/>

                        <Route path='orders'>
                            //<Route index element={<AdminOrders />}/>
                            <Route path=':orderId'  />
                        </Route>

                        <Route path='stock'>
                            <Route index element={<Inventory />}/>
                            <Route path='new' element={<div>where new stock should go</div>} />
                        </Route>

                        <Route path='menu' element={<AdminMenuPage />}/>
                        <Route path='users'>
                            <Route index element={<Clientes />}/>
                            <Route path=':userId' element={<div>where each user should go</div>}/>
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
                
                    <Route path='menu' element={<div>where menu should go</div>}/>

                </Route>
                <Route path='*' element={<h1>404</h1>} />
            </Route>
  
            <Route path='login' element={
                state.userSession.logged
                ? state.userSession.loginInfo.role === 'admin' 
                    ?
                    <Navigate to='/admin/menu'/>
                    :
                    <Navigate to='/home'/>
                : <LoginPage />
                }
            />
            <Route path='register' element= {state.userSession.logged ?<Register to='/home'/> : <Register />} />
        </Routes>
        
    )
}

export default BusinessRouter
