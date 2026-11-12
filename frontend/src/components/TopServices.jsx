import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopServices = () => {
    const navigate = useNavigate()
    const { services } = useContext(AppContext);  

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Services</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of services!</p>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {services.slice(0,3).map((item,index)=>(
                <div onClick={()=>navigate(`/servicesdetails/${item._id}`)} className='border border-b-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] translation-all-duration-500' key={index}> 
                    <img className='w-full h-80 object-cover' src={item.image} alt="" />
                    <div className='p-4'>
                        
                         <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                         <p className='text-gray-600 text-sm'>{item.description}</p>
                    </div>
                </div>             
            ))}
        </div>
        <button onClick={()=>{ navigate('/services'); scrollTo(0,0)}} className='bg-[#003359] text-white px-12 py-3 rounded-full mt-10'>more</button>
    </div>
  )
}

export default TopServices