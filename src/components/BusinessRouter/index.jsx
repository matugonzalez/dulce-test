import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAdminSystem } from '../../providers/AdminSystem'
import ProtectedRoute from './ProtectedRoute'
import HeaderBar from '../HeaderBar'
//css
import "./index.css"

// ADMIN PAGES
import AdminOrders from '../../pages/Admin/AdminOrders'
import AdminOrder from '../../pages/Admin/AdminOrder'
import Dashboard from '../../pages/Admin/Dashboard'
import Admin from '../../pages/Admin'

// CLIENT PAGES
import Home from '../../pages/Client/Home'
import ClientOrders from '../../pages/Client/ClientOrders'
import ClientOrder from '../../pages/Client/ClientOrder'
import LogIn from '../../pages/LogIn'
import Register from '../../pages/Register'

const BusinessRouter = () => {
    const [state] = useAdminSystem()
    const navigate = useNavigate()
    return (
        <>
        <HeaderBar/>
        <Routes>
            {/* ADMIN RELATED ROUTES */}
                {/* LOGIN PROTECTED ROUTES */}
                <Route element={<ProtectedRoute />}>
                    <Route path='/admin'>
                    
                        <Route index element={<Admin />} />

                        <Route path='dashboard' element={<Dashboard  />}/>

                        <Route path='orders'>
                            <Route index element={<AdminOrders />}/>
                            <Route path=':id' element={<AdminOrder />} />
                        </Route>

                        <Route path='stock'>
                            <Route index element={<div>where stock should go</div>}/>
                            <Route path='new' element={<div>where new stock should go</div>} />
                        </Route>

                        <Route path='menu' element={<div>where menu should go</div>}/>
                    </Route>
                </Route>
        
            <Route path='/'>
                <Route index element={<Navigate to='/home'/>} />
                <Route path='home' element={<Home />}/>
                <Route path='about-us' element={<div>where about-us should go</div>}/>
                <Route path='contact' element={<div>where contact should go</div>}/>
                <Route element={<ProtectedRoute />}>
                    <Route path='orders'>
                            <Route index element={<ClientOrders />}/>
                            <Route path=':id' element={<ClientOrder />} />
                    </Route>
                
                    <Route path='menu' element={<div>where menu should go</div>}/>

                </Route>
                <Route path='*' element={<h1>404</h1>} />
            </Route>
  
            <Route path='login' element={state.userSession.logged ? <Navigate to='/admin'/> : <LogIn />} />
            <Route path='register' element= {<Register />} />
        </Routes>
        
        </>
        
    )
}

export default BusinessRouter
