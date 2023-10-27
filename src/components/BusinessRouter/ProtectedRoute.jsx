import { Navigate, Outlet } from 'react-router-dom'
import { useAdminSystem } from '../../providers/AdminSystem'

const ProtectedRoute = () => {
    const [state] = useAdminSystem()

    if (state.userSession.logged) return  <Outlet/>
    return (
        <Navigate to='/login' replace />
    )
}

export default ProtectedRoute