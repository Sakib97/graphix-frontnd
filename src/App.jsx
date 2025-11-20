import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './features/home/pages/HomePage'
import NewHomePage from './features/home/pages/NewHomePage'
import SignupPage from './features/auth/pages/SignupPage'
import AuthRedirect from './components/common/AuthRedirect'
import { Toaster } from 'react-hot-toast'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/old" element={<HomePage />} />
        <Route path="/" element={<NewHomePage />} />
        <Route path="/signup" element={ <AuthRedirect><SignupPage /></AuthRedirect>} />
      </Routes>
    </>
  )
}

export default App
