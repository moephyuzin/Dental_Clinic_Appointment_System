import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-[#003359] rounded-lg px-6 md:px-10 lg:px-20'>
        {/* left side */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10.5vw] md:mb-[-30px]'>
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-normal leading-tight md:leading-tight lg:leading-tight">
        <span>Welcome to</span>
        <br />
        <span className="font-bold">MD Dental Clinic!</span>
        </h1>
            <p className='text-white font-light'>
                At MD Dental Clinic, your smile is our priority. 
                We provide expert dental care in a modern, comfortable setting-designed to make your experience as smooth 
                <br /> and stress-free as possible. Whether you need a routine check-up, a cleaning, or specialized treatment, 
                our dedicated team is here for you. 
                <br />
                 Book your appointment easily online and take the first step toward a healthier, brighter smile today.
            </p>
            <a href="/doctors" onClick={(e) => { e.preventDefault(); navigate('/doctors'); scrollTo(0, 0);}}
                className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-white-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                Book Appointment <img className='w-3' src={assets.arrow_icon} alt="" />
            </a>
            {/* <a href="#doctors" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-white-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                Book Appointment <img className='w-3' src={assets.arrow_icon} alt="" />
            </a> */}
        </div>
        {/* right side */}

        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header} alt="" />
        </div>
    </div>
  )
}

export default Header