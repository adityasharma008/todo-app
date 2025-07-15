import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

function Login() {
   axios.defaults.withCredentials = true

   const [state, setState] = useState('Sign Up')
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const navigate = useNavigate()

   const { backendUrl, isAuthorized, setIsAuthorized } = useContext(AppContext)

   const handleSubmit = (e) => {
      e.preventDefault()

      if(state === 'Sign Up') {
         axios.post(`${backendUrl}/api/v1/auth/register`, { name, email, password })
         .then(() => {
            setIsAuthorized(true)
            navigate('/')
         })
            .catch((err) => {
               console.log(`Error loggin in: ${err}`)
            })
      } else if(state === 'Login') {
         axios.post(`${backendUrl}/api/v1/auth/login`, { email, password })
            .then(() => { 
               setIsAuthorized(true)
               navigate('/') 
            })
            .catch((err) => {
               console.log(`Error logging: ${err}`)
            })
      }
   }

   return (
      state === 'Login' ? (
         <div className="flex items-center justify-center min-h-screen bg-[#f0f2f5]">
            <form className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-300 w-full max-w-sm">
               <div className="mb-4 text-left font-medium text-gray-700">Email
                  <input type="email" placeholder="email@gmail.com" onChange={e => setEmail(e.target.value)} value={email} className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base" />
               </div>
               <div className="mb-4 text-left font-medium text-gray-700">Password
                  <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password} className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base" />
               </div>
               <p className="mb-4 text-sm text-center">Don't have an account? <a href="" className="text-blue-500 hover:underline font-medium" onClick={(e) => { e.preventDefault(); setState('Sign Up') }}>Sign Up</a></p>
               <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition font-semibold text-base shadow-sm border border-blue-400" onClick={handleSubmit}>Submit</button>
            </form>
         </div>
      ) : (
         <div className="flex items-center justify-center min-h-screen bg-[#f0f2f5]">
            <form className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-300 w-full max-w-sm">
               <div className="mb-4 text-left font-medium text-gray-700">Name:
                  <input type="text" placeholder="username" onChange={e => setName(e.target.value)} value={name} className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base" />
               </div>
               <div className="mb-4 text-left font-medium text-gray-700">Email:
                  <input type="email" placeholder="email@gmail.com" onChange={e => setEmail(e.target.value)} value={email} className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base" />
               </div>
               <div className="mb-4 text-left font-medium text-gray-700">Password:
                  <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password} className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base" />
               </div>
               <p className="mb-4 text-sm text-center">Already have an account? <a href="" className="text-blue-500 hover:underline font-medium" onClick={(e) => {e.preventDefault(); setState('Login')}}>Login</a></p>
               <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition font-semibold text-base shadow-sm border border-blue-400" onClick={handleSubmit}>Submit</button>
            </form>
         </div>
      )
      
   )
}

export default Login