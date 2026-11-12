import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Appointments from './pages/Appointments'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Services from './pages/Services'
import ServicesDetails from './pages/ServicesDetails'
import Login from './pages/Login'
import Profile from './pages/Profile'
import MyAppointments from './pages/MyAppointments'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/services' element={<Services />} />
        <Route path="/servicesdetails/:serviceId" element={<ServicesDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/myappointments' element={<MyAppointments />} />
        <Route path='/appointments/:docId' element={<Appointments />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App