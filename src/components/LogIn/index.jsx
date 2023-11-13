import './LogIn.css'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { useAdminSystem } from '../../providers/AdminSystem'
import ClosedEye from '../Icons/ClosedEye'
import OpenedEye from '../Icons/OpenedEye'

const LogIn = ({className}) => {
    const [_, actions] = useAdminSystem()
    const [passwordInputType, setPasswordInputType] = useState('password')
    const formTipSpanRef = useRef(null)
    const submitButtonRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target 
        if(submitButtonRef.current){
            submitButtonRef.current.textContent = '...'
        }

        form.classList.remove('--login-failed')

        if (formTipSpanRef.current){
            formTipSpanRef.current.textContext = ''
        }

        actions.session.logIn({ email: event.target.email.value, password: event.target.password.value })
            .then((res) => {
                console.log(res)
                form.classList.remove('--login-failed')
                if (res.authorized) {
                    navigate('/')
                }
            })
            .catch((reason) => {
                form.classList.add('--login-failed')
                if (formTipSpanRef.current){
                    formTipSpanRef.current.textContent = reason
                }
            })
            .finally(() => {
                if (submitButtonRef.current){
                    submitButtonRef.current.textContent = 'ENTER'
                }
            })
    }

    const inputClassName = className === undefined ? '' : className

    return (
       <form className={`Login ${inputClassName}`} onSubmit={handleSubmit}>
            <label className='Login__label' htmlFor='email'>
                <strong className='Login-label__text'>Email</strong>
                <div className='Login-label__input'>
                    <input 
                    type='text'
                    id='email'
                    name='email'
                    required
                    autoFocus
                    />
                </div>
            </label>
            <label className='Login__label ' htmlFor='password'>
                <strong className='Login-label__text'>Password</strong>
                <div className='Login-label__input'>
                    <input 
                    type={passwordInputType}
                    id='password'
                    name='password'
                    required
                    />
                    <button
                    type='button'
                    onClick={() => setPasswordInputType(prev => prev === 'password' ? 'text' : 'password' )}
                    >{
                        passwordInputType === 'password' 
                        ? <OpenedEye className='Login-label-input__icon' />
                        : <ClosedEye className='Login-label-input__icon' />
                    }</button>
                </div>
            </label>
            <span className='Login__state' ref={formTipSpanRef}></span>
            <button className='Login__submit-bt' type='submit' ref={submitButtonRef}>Iniciar sesión</button>
        </form>
    )
    }


export default LogIn
