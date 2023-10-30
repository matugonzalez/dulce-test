import { createContext, useContext, useState } from 'react';
import { BUSINESS_INFO, ADMIN_LOGIN_INFO } from './consts';
import axios from 'axios';

const Context = createContext([
    { userSession: { logged: false }, businessInfo: BUSINESS_INFO},
    { userSession: { logIn: () => new Promise(() => {}), logOut: () => {} } },
]);

const AdminSystemContextProvider = ({children}) => {
    const [userSessionState, setUserSessionState] = useState({logged: false})
    const userSessionActions = {
        logIn: (loginInfo) => {
            return new Promise((resolve, reject) => {

                // axios.post('/api/users/auth', {email: loginInfo.email, password: loginInfo.password})
                //     .then((response)=>{
                //         if (response.data.authorized){
                //             setUserSessionState((prev) => ({...prev, logged:true, loginInfo: res.data.user}))
                //             resolve(true)
                //         } else {
                //             if (userSessionActions.logged) {
                //                 setUserSessionState((prev)=> ({...prev, logged: false, loginInfo:undefined})) 
                //             }
                //             reject('Wrong credentials')
                //         }
                //     })
                //     .catch((error) => {
                //         console.log(error)
                //     }) 

                setTimeout(()=>{
                    if (loginInfo.username === ADMIN_LOGIN_INFO.username && loginInfo.password === ADMIN_LOGIN_INFO.password){
                        setUserSessionState((prev) => ({...prev, logged:true, loginInfo: ADMIN_LOGIN_INFO}))
                        resolve(true)
                    } else {
                        if (userSessionActions.logged) {
                            setUserSessionState((prev) => ({...prev, logged: false, loginInfo: undefined}))
                        }
                        reject('Wrong credentials')
                    }
                }, 2000)

                //get /api/admin/login { username, password 
            })
        },
        logOut: () => {setUserSessionState((prev) => ({...prev, logged: false, loginInfo: undefined}))}

    }

    const value = [
        {userSession: userSessionState, businessInfo: BUSINESS_INFO},
        {userSession: userSessionActions}
    ]

  return (
    <Context.Provider value={value}>
        {children}
    </Context.Provider>
  )
}

export default AdminSystemContextProvider
export const useAdminSystem = () => useContext(Context)
