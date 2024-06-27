import Home from "./pages/Home"
import { Routes, Route} from "react-router-dom"
import RegisterPage from "./pages/auth/RegisterPage"
import LoginPage from "./pages/auth/LoginPage"
import AddPostPage from "./pages/AddPostPage"
import AuthProvider from "./components/AuthProvider"
import PostPage from "./pages/PostPage"

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/new-post" element={<AddPostPage/>}/>
        <Route path="/post/:id" element={<PostPage/>}/>
      </Routes>
    </AuthProvider>
  )
}

