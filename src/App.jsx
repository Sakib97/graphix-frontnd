import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './features/home/pages/HomePage'
import NewHomePage from './features/home/pages/NewHomePage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/old" element={<HomePage />} />
      <Route path="/" element={<NewHomePage />} />
    </Routes>
  )
}

export default App
