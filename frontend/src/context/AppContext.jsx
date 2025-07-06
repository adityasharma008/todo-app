import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

axios.defaults.withCredentials=true

const AppContext = createContext()

const AppContextProvider = (props) => {
   const backendUrl = import.meta.env.VITE_BACKEND_URL
   const [isAuthorized, setIsAuthorized] = useState(false)
   const [userData, setUserData] = useState(false)

   const getAuthState = async () => {
      try {
         const { data } = await axios.get(backendUrl + '/api/v1/user/isAuth')

         setIsAuthorized(true)
         getUserData()

      } catch(error) {
         console.log(error)
      }
   }

   const getUserData = async () => {
      try {
         const { data } = await axios.get(backendUrl + '/api/v1/user/data')

         setUserData(data)

      } catch(error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getAuthState()
   }, [])

   const value = {
      backendUrl,
      isAuthorized, setIsAuthorized,
      userData, setUserData,
      getUserData
   }

   return (
      <AppContext.Provider value={value}>
         {props.children}
      </AppContext.Provider>
   )
}

export {AppContext, AppContextProvider}