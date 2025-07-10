import { useNavigate } from "react-router-dom";

export default function Header() {
   const navigate = useNavigate()

   return (
      <div className="app-header">
         <h1 className="app-title">Todo List</h1>
         <button onClick={() => navigate('/login')}>Login</button>
      </div>
   )
}