import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/*' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App;
