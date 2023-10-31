import './Register.css'
import HeaderBar from '../../components/HeaderBar'
import Register from '../../components/Register'

const RegisterPage = () => {
    return (
        <div className='RegisterPage'>
            <HeaderBar className='RegisterPage_HeaderBar'/>
            <Register className='RegisterPage_Register'/>
        </div>
    )
}

export default RegisterPage