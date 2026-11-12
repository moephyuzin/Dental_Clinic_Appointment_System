import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Trash icon for delete button
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorsList = () => {
    const { backendUrl, doctors, aToken, getAllDoctors } = useContext(AdminContext);
   
    useEffect(() => {
        if (aToken) {
            getAllDoctors();
        }
    }, [aToken]);

    const handleDeleteDoctor = async (id) => {
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            try {
                const url = `${backendUrl}/api/admin/delete-doctor/${id}`;
                const { data } = await axios.delete(url, {
                    headers: { aToken },
                });

                if (data.success) {
                    toast.success(data.message);
                    getAllDoctors(); // Refresh the doctor list
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <div className='m-5 max-h-[90vh] overflow-scroll'>
            <h1 className='text-lg font-medium'>All Doctors</h1>
            <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
                {doctors.map((item, index) => (
                    <div
                        key={index}
                        className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden group relative'
                    >
                        <NavLink to={`/edit-doctor/${item._id}`}>
                            <img
                                className='bg-indigo-50 group-hover:bg-primary transition-all duration-500'
                                src={item.image}
                                alt=""
                            />
                            <div className='p-4'>
                                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                            </div>
                        </NavLink>

                        {/* Availability checkbox */}
                        <div className='px-4 pb-4 flex items-center gap-1 text-sm'>
                            <input
                                onClick={(e) => e.stopPropagation()} // Prevent NavLink trigger
                                onChange={() => changeAvailability(item._id)}
                                type='checkbox'
                                checked={item.available}
                            />
                            <p>Available</p>
                        </div>

                        {/* Delete Button */}
                        <div
                            className='absolute top-2 right-2 cursor-pointer text-red-500'
                            onClick={() => handleDeleteDoctor(item._id)} // Call the delete function on click
                        >
                            <FaTrash size={20} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;
