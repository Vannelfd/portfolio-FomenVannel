import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Login from './pages/Login'
import ProjetDetail from './components/ProjetDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/projet/:id" element={<ProjetDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App