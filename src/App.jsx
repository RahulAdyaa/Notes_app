import { useState } from 'react'
import './App.css'
import Home from './pages/Home/Home.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';

const routes=(
  <Router>
    <Routes>
      <Route path="/dashboard"  element={<Home />} />
      <Route path="/"  element={<Home />} />
      <Route path="/login"  element={<Login/>} />
      <Route path="/signup"  element={<SignUp/>} />
    </Routes>
  </Router>
)
const App=()=> {
  const [count, setCount] = useState(0)

  return (
    <div>
      {routes}
    </div>
  )
}

export default App
