import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Cars from "./pages/Cars"
import About from "./pages/About"
import Booking from "./pages/Booking"
import Contact from "./pages/Contact"
import './app.css'


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<>
          <Navbar  />
          <Home />
          

        </>} />
        <Route path="cars" element={<> 
        <Navbar  />
         <Cars />
         </>} />
        <Route path="about" element={<>
          <Navbar  /> 
          <About /></>} />
        <Route path="booking" element={<>
          <Navbar  />
        <Booking /></>} />
        <Route path="contact" element={<>
          <Navbar  />
          <Contact />
          </>} />

      </Routes>
    </>
  )
}

export default App
