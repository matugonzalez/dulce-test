import { ClientHeaderBar } from "../Components/HeaderBar"
import Background from '../Components/Background'
import Footer from "../../Footer"

const ClientLayout = ({ children }) => {
    return (
        <div className='ClientLayout'>
            <ClientHeaderBar />
            <Background>
                {children}
            </Background>
            <Footer />
        </div>
    )
}

export default ClientLayout
