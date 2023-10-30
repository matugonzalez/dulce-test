import './LoginPage.css'
import HeaderBar from '../../components/HeaderBar'
import LogIn from '../../components/LogIn'

const LoginPage = () => {
    return (
        <div className='LoginPage'>
            <HeaderBar />
            <LogIn className='LoginPage_Login'/>
        </div>
    )
}
export default LoginPage
