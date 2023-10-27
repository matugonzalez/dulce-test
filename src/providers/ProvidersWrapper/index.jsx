import { BrowserRouter } from 'react-router-dom';
import AdminSystemContextProvider from '../AdminSystem';
const ProvidersWrapper = ({children}) => {
    return (
        <AdminSystemContextProvider>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </AdminSystemContextProvider>
    )
}

export default ProvidersWrapper