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
import { NewRequest } from './Components/Requests/NewRequest'
import { OthersRequestTable } from './Components/Requests/OthersRequestTable'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* empty string or / for path makes the compoent render at startup*/}
          <Route path="" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="users" element={<UserTable/>}/>
          <Route path="requests/my-requests" element={<RequestTable/>}/>
          <Route path="requests/new-request" element={<NewRequest/>}/>
          <Route path="requests/requests-for-approval" element={<OthersRequestTable/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
