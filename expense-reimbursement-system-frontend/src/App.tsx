import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Components/LoginRegister/Login'
import 'bootstrap/dist/css/bootstrap.css'
import { Register } from './Components/LoginRegister/Register'
import { UserTable } from './Components/User/UserTable'
import { RequestTable } from './Components/Requests/RequestTable'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* empty string or / for path makes the compoent render at startup*/}
          <Route path="" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="users" element={<UserTable/>}/>
          <Route path="requests" element={<RequestTable/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
