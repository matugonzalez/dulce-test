import { createContext, useContext, useState } from 'react'
import { BUSINESS_INFO, ADMIN_LOGIN_INFO, CLIENT_LOGIN_INFO, API_INFO } from './consts'
import axios from 'axios'

const DefaultUserSessionState = {
    logged: false,
    token: null,
    user: {
        user_id: null,
        client_id: null,
        admin_id: null,
        fullname: null,
        birthdate: null,
        cellphone: null,
        role_id: null,
        role: null,
    },
}

const Context = createContext([
    { session: DefaultUserSessionState, business: BUSINESS_INFO, api: API_INFO },
    { session: {} }
])

const MockLoggedAsClient = {
    logged: true,
    token: null,
    user: {
        user_id: 1,
        client_id: 1,
        admin_id: null,
        fullname: 'Jhon',
        birthdate: new Date('2000-10-10'),
        cellphone: '+3819666333',
        role_id: 1,
        role: 'client',
    },
}


const AdminSystemContextProvider = ({ children }) => {
    const [userSessionState, setUserSessionState] = useState(() => DefaultUserSessionState)
    console.log(userSessionState)

    const userSessionActions = {
        logIn: (loginInfo) => {
            return new Promise((resolve, reject) => {
                axios.post(`${API_INFO.base_path}/users/auth`, { email: loginInfo.email, password: loginInfo.password })
                .then((response) => {
                    if (!response.data.authenticated) {
                        setUserSessionState(() => DefaultUserSessionState)
                        resolve({ authorized: false, message: response.data.message })
                        return
                    }

                    setUserSessionState({ logged: true, token: response.data.token, user: response.data.user })
                    resolve({ authorized: true })
                })
                .catch((error) => {
                    if (ADMIN_LOGIN_INFO.password === loginInfo.password && ADMIN_LOGIN_INFO.email === loginInfo.email) {
                        setUserSessionState({ logged: true, token: null, user: { ...DefaultUserSessionState, fullname: 'Admin', role: 'admin' }})
                    } else if (CLIENT_LOGIN_INFO.password === loginInfo.password && CLIENT_LOGIN_INFO.email === loginInfo.email) {
                        setUserSessionState({ logged: true, token: null, user: { ...DefaultUserSessionState, fullname: 'Client', role: 'client' }})
                    } else {
                        console.error({ LogInError: error })
                        reject(error)
                    }
                })
            })
        },
        logOut: () => {
            setUserSessionState(() => DefaultUserSessionState)
        },
        register: (registerInfo) => {
            return new Promise((resolve, reject) => {
                axios.post(
                    `${API_INFO.base_path}/users/clients`,
                    {
                        email: registerInfo.email,
                        password: registerInfo.password,
                        fullname: registerInfo.fullname,
                        birthdate: registerInfo.birthdate,
                        cellphone: registerInfo.cellphone
                    }
                ).then(resolve)
                .catch((err) => {
                    console.error({ RegisterInfo: err })
                    reject(err)
                })
            })
        },
    }

    const value = [
        { session: userSessionState, business: BUSINESS_INFO, api: API_INFO },
        { session: userSessionActions }
    ]

  return (
    <Context.Provider value={value}>
        {children}
    </Context.Provider>
  )
}

export default AdminSystemContextProvider
export const useAdminSystem = () => useContext(Context)
