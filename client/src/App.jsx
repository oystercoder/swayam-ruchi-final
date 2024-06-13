import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import './App.css'
import Home from './components/Home.jsx'
import Saved from './components/Saved.jsx'
import Auth from './components/Auth'
import Create from './components/Create.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/saved" element={<Saved />}/>
      <Route path="/auth" element={<Auth />}/>
      <Route path="/create" element={<Create />}/>
    
   
    </Routes>

    </BrowserRouter>
     
    </>
  )
}

export default App
