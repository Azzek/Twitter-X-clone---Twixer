import Navbar from "./components/ui/navbar"
import Recentposts from "./components/ui/recentposts"
import MainCategories from "./components/ui/mainCategories"
import Footer from "./components/ui/footer"
export default function App() {
  return (
    <div className="App w-full h-screen bg-slate-200">
      <Navbar></Navbar>
      <MainCategories></MainCategories>
      <Recentposts></Recentposts>
      <Footer></Footer>
    </div>
  )
}

