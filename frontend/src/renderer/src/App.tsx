import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ListUsers from './components/ListUsers'

export default function App(): JSX.Element {
  return (
    <>
<div className="text-zinc-50 h-[100vh] flex justify-center items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-50% to-indigo-500 to-100%" >
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<ListUsers />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}
