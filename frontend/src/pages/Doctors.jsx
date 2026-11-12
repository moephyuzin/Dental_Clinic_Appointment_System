import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Doctors = () => {

  const {doctors} = useContext(AppContext)
  const [filterDoc,setFilterDoc] = useState([])
  const navigate = useNavigate()

  const applyFilter= () => {
    setFilterDoc(doctors)
  }
  
  useEffect(()=>{
    applyFilter()
  },[doctors])

  return (
    <div className='flex flex-col items-center text-gray-900 md:mx-10'>
      <p className='text-2xl font-medium'>Explore Doctor Profiles and Choose Who’s Right for You!</p>
      <div className='w-full grid grid-cols-autoFill gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {
          filterDoc.map((item,index)=>(
                <div onClick={()=>navigate(`/appointments/${item._id}`)} className='border border-b-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] translation-all-duration-500' key={index}> 
                    <img className='bg-primary' src={item.image} alt="" />
                    <div className='p-4'>
                        <div className={`flex items-center gap-2 text-sm text-center ${item.available?'text-green-500': 'text-red-500'} `}>
                            <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} bg-green-500 rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                        </div>
                         <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                         <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>
                </div>             
            ))
        }
      </div>
    </div>
  )
}

export default Doctors