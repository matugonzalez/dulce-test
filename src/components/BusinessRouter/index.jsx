import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAdminSystem } from '../../providers/AdminSystem'

// UNAUTH PAGES
import MenuPage from '../../pages/MenuPage'
import NotFoundPage from '../../pages/NotFound'

// ADMIN PAGES
import AdminOrders from '../../pages/Admin/AdminOrdersPage'
import AdminOrder from '../../pages/Admin/AdminOrderPage'
import AdminInventoryPage from '../../pages/Admin/AdminInventoryPage'
import AdminMenuPage from '../../pages/Admin/AdminMenuPage'

// CLIENT PAGES
import Home from '../../pages/Client/Home'
import ClientOrders from '../../pages/Client/ClientOrders'
import ClientOrder from '../../pages/Client/ClientOrder'
import ClientMenu from '../../pages/Client/Menu'

// LOGIN REGISTER PAGES
import RegisterPage from '../../pages/RegisterPage'
import LoginPage from '../../pages/LoginPage'

// LAYOUTS
import UnauthLayout from '../Layouts/Unauth'
import ClientLayout from '../Layouts/Client'
import AdminLayout from '../Layouts/Admin'

const BusinessRouter = () => {
    const [state] = useAdminSystem()

    if (!state.session.logged) {
        return (
            <Routes>
                {!state.session.logged && <>
                    <Route path='/' element={<UnauthLayout><Outlet /></UnauthLayout>}>
                        <Route index element={<Navigate to='/home' />} />
                        <Route path='home' element={<Home />} />
                        <Route path='menu' element={<MenuPage />} />
                        <Route path='login' element={<LoginPage />} />
                        <Route path='register' element={<RegisterPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>
                </>}
            </Routes>
        )
    }

    if (state.session.user.role === 'client') {
        return (
            <Routes>
                <Route path='/' element={<ClientLayout><Outlet /></ClientLayout>}>
                    <Route index element={<Navigate to='/home' />} />
                    <Route path='home' element={<Home />} />
                    <Route path='menu' element={<ClientMenu />} />
                    <Route path='orders'>
                        <Route index element={<ClientOrders />} />
                        <Route path=':id' element={<ClientOrder />} />
                    </Route>
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
        )
    }

    if (state.session.user.role === 'admin') {
        return (
            <Routes>
                <Route path='/' element={<AdminLayout><Outlet /></AdminLayout>}>
                    <Route index element={<Navigate to='/orders' />} />
                    <Route path='orders'>
                        <Route index element={<AdminOrders />} />
                        <Route path=':id' element={<AdminOrder />} />
                    </Route>
                    <Route path='menu' element={<AdminMenuPage />} />
                    <Route path='inventory' element={<AdminInventoryPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
        )
    }
}

export default BusinessRouter
