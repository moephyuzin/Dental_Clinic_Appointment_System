import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Trash icon for delete button

const ServiceList = () => {
  const { backendUrl, services, aToken, getAllServices } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllServices();
    }
  }, [aToken]);

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const url = `${backendUrl}/api/admin/delete-service/${id}`;
        const { data } = await axios.delete(url, {
          headers: { aToken },
        });

        if (data.success) {
          toast.success(data.message);
          getAllServices(); // Refresh the service list
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-scroll">
      <h1 className="text-lg font-medium">All Services</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5 gap-y-6">
        {services.map((item, index) => (
          <div
            key={index}
            className="border border-indigo-200 rounded-xl overflow-hidden cursor-pointer group relative transition-all duration-500 transform hover:scale-105"
          >
            <NavLink to={`/edit-service/${item._id}`}>
              <img
                className="w-full h-80 object-cover group-hover:opacity-75 transition-opacity duration-300"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
                <p className="text-zinc-600 text-sm line-clamp-2">{item.description}</p>
              </div>
            </NavLink>

            {/* Delete Button */}
            <div
              className="absolute top-2 right-2 cursor-pointer text-red-500"
              onClick={() => handleDeleteService(item._id)} // Call the delete function on click
            >
              <FaTrash size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
