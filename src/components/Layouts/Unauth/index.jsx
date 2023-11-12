import { UnauthHeaderBar } from "../Components/HeaderBar"
import Background from '../Components/Background'
import Footer from "../../Footer"

const UnauthLayout = ({ children }) => {
    return (
        <div className='UnauthLayout'>
            <UnauthHeaderBar />
            <Background>
                {children}
            </Background>
            <Footer />
        </div>
    )
}

export default UnauthLayout
