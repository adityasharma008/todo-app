import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Header() {
   const navigate = useNavigate()

   axios.defaults.withCredentials=true
   const {backendUrl, isAuthorized, setIsAuthorized} = useContext(AppContext)

   return (
      <div className="mb-8 flex flex-col items-center border border-gray-300 shadow-sm rounded-xl bg-white py-4">
         <h1 className="text-3xl sm:text-4xl font-semibold text-[#333] mb-0 tracking-tight app-title w-full text-center">Todo List</h1>
         <div className="absolute top-4 right-6">
         {isAuthorized ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition font-medium shadow-sm border border-red-400"
              onClick={() => {
                axios.post(`${backendUrl}/api/v1/auth/logout`)
                  .then(setIsAuthorized(false))
                  .catch((err) => console.log(`Error logging out: ${err}`))
              }}
            >Logout</button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition font-medium shadow-sm border border-blue-400"
              onClick={() => navigate('/login')}
            >Login</button>
          )}
         </div>
      </div>
   )
}