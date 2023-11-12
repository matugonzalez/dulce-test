import { AdminHeaderBar } from "../Components/HeaderBar"
import Background from '../Components/Background'
import Footer from "../../Footer"

const AdminLayout = ({ children }) => {
    return (
        <div className='AdminLayout'>
            <AdminHeaderBar />
            <Background>
                {children}
            </Background>
            <Footer />
        </div>
    )
}

export default AdminLayout
