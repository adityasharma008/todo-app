import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Header() {
   const navigate = useNavigate()

   axios.defaults.withCredentials=true
   const {backendUrl, isAuthorized, setIsAuthorized} = useContext(AppContext)

   return (
      <div className="app-header">
         <h1 className="app-title">Todo List</h1>
         {
            isAuthorized ? (
               <button onClick={() => {
                  axios.post(`${backendUrl}/api/v1/auth/logout`)
                  .then(setIsAuthorized(false))
                  .catch((err) => console.log(`Error logging out: ${err}`))
               }}>Logout</button>
            ) : (
                  <button onClick = { () => navigate('/login') }>Login</button>
            )
         }
      </div>
   )
}