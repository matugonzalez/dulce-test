import './Register.css'
import { useState, useRef } from 'react'
import { useAdminSystem } from '../../providers/AdminSystem'
import ClosedEye from '../Icons/ClosedEye'
import OpenedEye from '../Icons/OpenedEye'

const Register = ({className}) => {
    const [_, actions] = useAdminSystem()
    const [passwordInputType, setPasswordInputType] = useState('password')
    const formTipSpanRef = useRef(null)
    const submitButtonRef = useRef(null)

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target 
        if(submitButtonRef.current){
            submitButtonRef.current.textContent = '...'
        }

        form.classList.remove('--Register-failed')

        if (formTipSpanRef.current){
            formTipSpanRef.current.textContext = ''
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


        if(!emailRegex.test(event.target.email.value)){
            console.log('Invalid email format')
            return
        }

        actions.session.register({
            email: event.target.email.value,
            fullname: event.target.fullname.value, 
            cellphone: event.target.cellphone.value, 
            birthdate: event.target.birthdate.value, 
            password: event.target.password.value
        })
            .then(() => {
                form.classList.remove('--Register-failed')
            })
            .catch((reason)=> {
                form.classList.add('--Register-failed')
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
        <form className={`Register ${inputClassName}`} onSubmit={handleSubmit}>
            
            <label className='Register__label' htmlFor='email'>
                <strong className='Register-label__text'>email</strong>
                <div className='Register-label__input'>
                    <input 
                    type='text'
                    id='email'
                    name='email'
                    required
                    autoFocus
                    />
                </div>
            </label>

            <label className='Register__label' htmlFor='fullname'>
                <strong className='Register-label__text'>fullname</strong>
                <div className='Register-label__input'>
                    <input 
                    type='text'
                    id='fullname'
                    name='fullname'
                    required
                    autoFocus
                    />
                </div>
            </label>

            <label className='Register__label' htmlFor='cellphone'>
                <strong className='Register-label__text'>cellphone</strong>
                <div className='Register-label__input'>
                    <input 
                    type='text'
                    id='cellphone'
                    name='cellphone'
                    required
                    autoFocus
                    />
                </div>
            </label>

            <label className='Register__label' htmlFor='birthdate'>
                <strong className='Register-label__text'>birthdate</strong>
                <div className='Register-label__input'>
                    <input 
                    type='date'
                    id='birthdate'
                    name='birthdate'
                    required
                    autoFocus
                    />
                </div>
            </label>

            <label className='Register__label' htmlFor='password'>
                <strong className='Register-label__text'>password</strong>
                <div className='Register-label__input'>
                    <input 
                    type={passwordInputType}
                    id='password'
                    name='password'
                    required
                    autoFocus
                    />
                    <button
                    type='button'
                    onClick={() => setPasswordInputType(prev => prev === 'password' ? 'text' : 'password' )}
                    >{
                        passwordInputType === 'password' 
                        ? <OpenedEye className='Register-label-input__icon' />
                        : <ClosedEye className='Register-label-input__icon' />
                    }</button>
                </div>
            </label>
            <span className='Register__state' ref={formTipSpanRef}></span>
            <button className='Register__submit-bt' type='submit' ref={submitButtonRef}>Crear cuenta</button>
            
        </form>
    )
}
export default Register
