import { Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Addquiz from './pages/Addquiz'
import Updatequiz from './pages/Updatequiz'

function App() {

  return (
   <Routes>
    <Route path='/' element={<Login />}></Route>
    <Route path='/dashboard' element={<Dashboard />}></Route>
    <Route path='/dashboard/addquiz' element={<Addquiz />} ></Route>
    <Route path='/dashboard/update/:id' element={<Updatequiz />}></Route>
   </Routes>
  )
}

export default App
