import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Services = () => {

  const {services, searchTerm} = useContext(AppContext)
  const [filterServices,setFilterServices] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (searchTerm.trim() === "") {
        setFilterServices(services);
    } else {
        const filtered = services.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilterServices(filtered);
    }
}, [services, searchTerm]); 

  return (
    <div className='flex flex-col items-center text-gray-900 md:mx-10'>
      <p className='text-2xl font-medium'>Browse through the Services.</p>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {
          filterServices.map((item,index)=>(
                <div onClick={()=>navigate(`/servicesdetails/${item._id}`)}  className='border border-b-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}> 
                    <img className='w-full h-80 object-cover' src={item.image} alt="" />
                    <div className='p-4'>
                         <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                         <p className='text-gray-600 text-sm'>{item.description}</p>
                    </div>
                </div>             
            ))
        }
      </div>
    </div>
  )
}

export default Services