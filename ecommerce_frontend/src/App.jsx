import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import AllRoute from './Routes/Route'
import Navbar from './Layout/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Navbar></Navbar>
    <AllRoute></AllRoute>
    </BrowserRouter>
    </>
  )
}

export default App
