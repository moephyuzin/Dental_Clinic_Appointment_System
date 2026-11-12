import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import {AdminContext} from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const AddService = () => {

  const [serviceImg, setServiceImg] = useState(false)
  const [name, setName] = useState('')
  const [fees, setFees] = useState('')
  const [description, setDescription] = useState('')
  
  const {backendUrl, aToken} = useContext(AdminContext)

  const onSubmitHandler = async(event) => {
    event.preventDefault()

    try{
      if(!serviceImg){
        return toast.error('Image not selected')
      }

      const formData = new FormData()
      formData.append('image', serviceImg)
      formData.append('name', name)
      formData.append('fees',Number(fees))
      formData.append('description', description)

      formData.forEach((value,key) => {
          console.log(`${key} : ${value}`);
      })

      const {data} = await axios.post(backendUrl + '/api/admin/add-service', formData, {headers:{aToken}})
      
      if (data.success) {
        toast.success(data.message)
        setServiceImg(false)
        setName('')
        setDescription('')
        setFees('')

      } else {
        toast.error (data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }
  return (
    <form onSubmit = {onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium '>Add Service</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={serviceImg ? URL.createObjectURL(serviceImg) : assets.upload_area} alt="" />
          </label>
            <input onChange={(e) => setServiceImg(e.target.files[0])} type="file" id="doc-img" hidden/>
            <p>Upload Service <br/> Picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Service Name</p>
              <input onChange={(e) => setName(e.target.value)} value = {name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p className='mt-4 mb-2'>Service Description</p>
              <textarea onChange={(e) => setDescription(e.target.value)} value = {description} className='w-full px-4 pt-2 border rounded' type="text" placeholder='Service Description' rows={5} required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value = {fees} className='border rounded px-3 py-2' type="number" placeholder='fees' required />
            </div>
          </div>
        </div>
        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Service</button>
      </div>
    </form>
  )
}

export default AddService