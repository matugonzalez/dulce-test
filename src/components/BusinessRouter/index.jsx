import { Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom'
import { useAdminSystem } from '../../providers/AdminSystem'
import ProtectedRoute from './ProtectedRoute'

// ADMIN PAGES
import AdminOrders from '../../pages/Admin/AdminOrdersPage'
import AdminOrder from '../../pages/Admin/AdminOrderPage'
import Dashboard from '../../pages/Admin/Dashboard'
import Stock from '../../pages/Admin/Stock'
import AdminMenuPage from '../../pages/Admin/AdminMenuPage'

// CLIENT PAGES
import Home from '../../pages/Client/Home'
import AboutUs from '../../pages/Client/AboutUs'
import ClientOrders from '../../pages/Client/ClientOrders'
import ClientOrder from '../../pages/Client/ClientOrder'
import ClientMenu from '../../pages/Client/Menu'

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
                <Route path='/admin' element={<Outlet />}>
                    <Route element={<ProtectedRoute />}>
                        <Route index path='dashboard' element={<Dashboard  />}/>

                        <Route path='orders'>
                            <Route index element={<AdminOrders />}/>
                            <Route path=':orderId' element={<AdminOrder />} />
                        </Route>

                        <Route path='stock'>
                            <Route index element={<Stock/>}/>
                            <Route path='new' element={<Stock/>} />
                        </Route>

                        <Route path='menu' element={<AdminMenuPage />}/>
                        <Route path='users'>
                            <Route index element={<div>where list of users should go</div>}/>
                            <Route path=':userId' element={<div>where each user should go</div>}/>
                        </Route>
                    </Route>

                    <Route path='*' element={<h1>404</h1>} />
                </Route>
        
            <Route path='/'>
                <Route index element={<Navigate to='/home'/>} />
                <Route path='home' element={<Home />}/>
                <Route path='about-us' element={<AboutUs />}/>

                <Route path='menu' element={<ClientMenu />}/>

                <Route element={<ProtectedRoute />}>
                    <Route path='orders'>
                            <Route index element={<ClientOrders />}/>
                            <Route path=':id' element={<ClientOrder />} />
                    </Route>
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
