import './LogIn.css'
import { useAdminSystem } from '../../providers/AdminSystem'
import { useState, useRef, createRef } from 'react'
import ClosedEye from '../Icons/ClosedEye'
import OpenedEye from '../Icons/OpenedEye'
import Button from '../Button'

const LogIn = ({className}) => {
    const [_, actions] = useAdminSystem()
    const [passwordInputType, setPasswordInputType] = useState('password')
    const formTipSpanRef = useRef(null)
    const submitButtonRef = createRef()

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

        actions.userSession.logIn({username: event.target.username.value, password: event.target.password.value})
            .then(() => {
                form.classList.remove('--login-failed')
            })
            .catch((reason)=> {
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
            <label className='Login__label' htmlFor='username'>
                <strong className='Login-label__text'>Username</strong>
                <div className='Login-label__input'>
                    <input 
                    type='text'
                    id='username'
                    name='username'
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
            <Button className='Login__submit-bt' type='submit' ref={submitButtonRef}>ENTER</Button>
        </form>
    )
    }


export default LogIn