import React from 'react'
import ProtectedRoute from './ProtectedRoute'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAdminSystem } from '../../providers/AdminSystem'
import Home from '../../pages/Client/Home'
import AdminOrders from '../../pages/Admin/AdminOrders'
import AdminOrder from '../../pages/Admin/AdminOrder'
import ClientOrders from '../../pages/Client/ClientOrders'
import ClientOrder from '../../pages/Client/ClientOrder'
import LogIn from '../../pages/LogIn'
import Register from '../../pages/Register'

const BusinessRouter = () => {
    const [state] = useAdminSystem()
    return (
        <Routes>
            {/* ADMIN RELATED ROUTES */}
            <Route path='/admin'>
                {/* LOGIN PROTECTED ROUTES */}
                <Route element={<ProtectedRoute />}>
                    
                    <Route index element={<div> <Home /></div> } />

                    <Route path='orders'>
                        <Route index element={<AdminOrders />}/>
                        <Route path=':id' element={<AdminOrder />} />
                    </Route>

                    <Route path='stock'>
                        <Route index element={<Stock />}/>
                        <Route path='new' element={<NewStock />} />
                    </Route>

                </Route>
        
            </Route>

            <Route path='/client'>

                <Route element={<ProtectedRoute />}>
                    
                    <Route index element={<div> <Home /></div> } />

                    <Route path='orders'>
                        <Route index element={<AdminOrders />}/>
                        <Route path=':id' element={<AdminOrder />} />
                    </Route>

                    <Route path='stock'>
                        <Route index element={<Stock />}/>
                        <Route path='new' element={<NewStock />} />
                    </Route>
                </Route>
        
            </Route>
            <Route path='login' element={state.userSession.logged ? <Navigate to='/admin'/> : <LogIn />} />
            <Route path='register' element= {<Register />} />
            <Route path='/'>
                <Route index element={<Navigate to='/admin'/>} />
                <Route path='cart' element={<div>Cart component</div>} />
                <Route path='*' element={<h1>404</h1>} />
            </Route>
        </Routes>
    )
}

export default BusinessRouter