import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();

    const { token, setToken, userData, searchTerm, setSearchTerm } = useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token');
        navigate('/')
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            navigate("/services"); // Navigate to Services page when pressing Enter
        }
    };

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img src={assets.logo} alt="logo" className="h-20 w-auto cursor-pointer" onClick={() => navigate('/')} />
            <ul className='hidden md:flex items-start gap-5 font-medium text-sm md:text-base'>
                <NavLink to='/'>
                    {({ isActive }) => (
                        <div className='flex flex-col items-center'>
                            <li className={`py-1 ${isActive ? 'text-[#003359]' : 'text-gray-700'}`}>Home</li>
                            <hr style={{ backgroundColor: '#003359' }} className={`h-0.5 w-3/5 m-auto ${isActive ? 'block' : 'hidden'}`} />
                        </div>
                    )}
                </NavLink>

                <NavLink to='/doctors'>
                    {({ isActive }) => (
                        <div className='flex flex-col items-center'>
                            <li className={`py-1 ${isActive ? 'text-[#003359]' : 'text-gray-700'}`}>Doctors</li>
                            <hr style={{ backgroundColor: '#003359' }} className={`h-0.5 w-3/5 m-auto ${isActive ? 'block' : 'hidden'}`} />
                        </div>
                    )}
                </NavLink>

                <NavLink to='/services'>
                    {({ isActive }) => (
                        <div className='flex flex-col items-center'>
                            <li className={`py-1 ${isActive ? 'text-[#003359]' : 'text-gray-700'}`}>Services</li>
                            <hr style={{ backgroundColor: '#003359' }} className={`h-0.5 w-3/5 m-auto ${isActive ? 'block' : 'hidden'}`} />
                        </div>
                    )}
                </NavLink>

                <NavLink to='/about'>
                    {({ isActive }) => (
                        <div className='flex flex-col items-center'>
                            <li className={`py-1 ${isActive ? 'text-[#003359]' : 'text-gray-700'}`}>About</li>
                            <hr style={{ backgroundColor: '#003359' }} className={`h-0.5 w-3/5 m-auto ${isActive ? 'block' : 'hidden'}`} />
                        </div>
                    )}
                </NavLink>

                <NavLink to='/contact'>
                    {({ isActive }) => (
                        <div className='flex flex-col items-center'>
                            <li className={`py-1 ${isActive ? 'text-[#003359]' : 'text-gray-700'}`}>Contact</li>
                            <hr style={{ backgroundColor: '#003359' }} className={`h-0.5 w-3/5 m-auto ${isActive ? 'block' : 'hidden'}`} />
                        </div>
                    )}
                </NavLink>
            </ul>


            {/* Search Bar + User Menu */}
            <div className='flex items-center gap-4'>
                {/* Search Bar */}
                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyPress}
                        // onFocus={() => navigate('/services')}  
                        className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#003359] w-64"
                    />
                </div>
                {/* User Account */}
                {
                    token && userData
                        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-10 rounded-full' src={userData.image} alt='' />
                            <img className='w-2.5' src={assets.dropdown_icon} alt='' />
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('/profile')} className='hover:text-[#003359] cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('/myappointments')} className='hover:text-[#003359] cursor-pointer'>My Appointments</p>
                                    <p onClick={logout} className='hover:text-[#003359] cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                        : <button onClick={() => navigate('/login')} className='bg-[#003359] text-white px-8 py-3 rounded-full font-medium text-sm md:text-base hidden md:block'>Create Account</button>
                }

                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
                {/* Mobile Menu */}
                <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 font-medium text-xs'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block' >Home</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block' >Doctors</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block' >About</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block' >Contact</p></NavLink>
                    </ul>
                </div>

            </div>
        </div>
    )
}


export default Navbar