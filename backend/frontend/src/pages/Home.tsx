import Navbar from "../components/Navbar"
import MainCategories from "../components/MainCategories"
import Recentposts from "../components/Recentposts"
import Footer from "../components/Footer"

const Home = () => {
  return (
    <div className="App w-full h-screen bg-slate-200">
      <Navbar></Navbar>
      {/* <MainCategories></MainCategories> */}
      <Recentposts></Recentposts>
      <Footer></Footer>
    </div>
  )
}

export default Home