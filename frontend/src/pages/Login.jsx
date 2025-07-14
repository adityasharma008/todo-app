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
         <div className="login-form-div">
            <form>
               <div>Email
                  <input type="email" placeholder="email@gmail.com" onChange={e => setEmail(e.target.value)} value={email} />
               </div>
               <div>Password
                  <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password} />
               </div>
               <p>Don't have an account? <a href="" onClick={(e) => { e.preventDefault(); setState('Sign Up') }}>Sign Up</a></p>
               <button onClick={handleSubmit}>Submit</button>
            </form>
         </div>
      ) : (
         <div className="signup-form-div">
            <form>
               <div>Name:
                  <input type="text" placeholder="username" onChange={e => setName(e.target.value)} value={name} />
               </div>
               <div>Email:
                  <input type="email" placeholder="email@gmail.com" onChange={e => setEmail(e.target.value)} value={email} />
               </div>
               <div>Password:
                  <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password} />
               </div>
               <p>Already have an account? <a href="" onClick={(e) => {e.preventDefault(); setState('Login')}}>Login</a></p>
               <button onClick={handleSubmit}>Submit</button>
            </form>
         </div>
      )
      
   )
}

export default Login