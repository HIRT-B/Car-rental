import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Cars from "./pages/Cars"
import About from "./pages/About"
import './App.css'
import Login from "./pages/Login"
import { useEffect, useState } from "react"
import Contact from "./pages/Contact"
import Register from "./pages/Register"
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from './pages/Dashboard';
import Rentals from './pages/Rentals';
import Users from './pages/Users'
import Settings from './pages/Settings';
import NewCar from './pages/NewCar';
import UpdateCar from "./pages/UpdateCar"
import ProductPage from "./pages/ProductPage"
import ReservationForm from "./pages/ReservationForm"
import ConfermReserve from "./pages/ConfermReserve"
import ResearchZone from "./components/ResearchZone"
import Footer from "./components/Footer"
import UserAccount from "./pages/UserAccount"
import CarDetails from "./pages/CarDetails"
import UserSettings from "./pages/UserSettings"


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<>
          <Navbar user={user} setUser={setUser}/>
          <Home />
          <Footer />


        </>} />
        <Route path="all-cars" element={<>
          <Navbar user={user} setUser={setUser}/>
          <ProductPage />
          <Footer />
        </>} />
        <Route path="car/:id" element={<>
          <Navbar user={user} setUser={setUser}/>
          <CarDetails />
          <Footer />
        </>} />
        <Route path="about" element={<>
          <Navbar user={user} setUser={setUser}/>
          <About />
          <Footer />
          </>} />
        <Route path="contact" element={<>
          <Navbar user={user} setUser={setUser}/>
          <Contact/>
          <Footer />
          </>} />

           <Route path="myaccount/:id" element={<>
          <Navbar user={user} setUser={setUser}/>
          <UserAccount />
          <Footer />
        </>} />
           <Route path="/user/user-settings" element={<>
          <Navbar user={user} setUser={setUser}/>
          <UserSettings />
          <Footer />
        </>} />
        <Route path="login" element={<>
          <Login setUser={setUser} />
        </>} />
        <Route path="register" element={<>
          <Register setUser={setUser} />
        </>} />
        
        <Route path="users" element={<Home/>} />
        <Route path="book" element={<ReservationForm />} />
        <Route path="confirmation" element={<ConfermReserve />} />
        <Route path="search" element={<ResearchZone />} />
        
        



        {/* Admin */}
        <Route path='/admin/*' element={<>
          <TopNav />
          <Sidebar />
          <div className="content">
            <Routes> 
                <Route index element={<Dashboard/>}/>
                <Route path='cars' element={<Cars/>}/>
                <Route path='rentals' element={<Rentals/>}/>
                <Route path='users' element={<Users/>}/>
                <Route path='settings' element={<Settings/>}/>
                <Route path='new-car' element={<NewCar />}/>
                <Route path='update-car/:id' element={<UpdateCar />}/>
            </Routes>
            
          </div>
        </>} />


      </Routes>
    </>
  )
}

export default App
