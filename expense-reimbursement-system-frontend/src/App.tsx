import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Components/LoginRegister/Login'
import 'bootstrap/dist/css/bootstrap.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* empty string or / for path makes the compoent render at startup*/}
          <Route path="" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
