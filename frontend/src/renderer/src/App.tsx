import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'

export default function App(): JSX.Element {
  return (
    <>
      <div className="text-white h-[100vh] flex justify-center items-center" style={{ backgroundImage: "url('/src/assets/teste.jpg')" }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}
