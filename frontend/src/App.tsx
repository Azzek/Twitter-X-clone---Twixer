import Home from "./pages/Home"
import { Routes, Route} from "react-router-dom"
import RegisterPage from "./pages/auth/RegisterPage"
import LoginPage from "./pages/auth/LoginPage"
import AuthProvider from "./components/AuthProvider"
import ProfilePage from "./pages/ProfilePage"

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<AuthProvider><Home/></AuthProvider>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<AuthProvider><LoginPage/></AuthProvider>}/>
        <Route path="/:username" element={<AuthProvider><ProfilePage/></AuthProvider>}/>
      </Routes>
  )
}

