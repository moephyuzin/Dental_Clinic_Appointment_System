import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditService = () => {
  const { id } = useParams();
  const { backendUrl, aToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
    fees: '',
    image: null,
  });

  const [serviceImg, setServiceImg] = useState(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const { data } = await axios.post(`${backendUrl}/api/admin/all-services`, {}, {
          headers: { aToken },
        });

        if (data.success) {
          const service = data.services.find((s) => s._id === id);
          if (service) {
            setServiceData({
              name: service.name || '',
              description: service.description || '',
              fees: service.fees || '',
              image: service.image || null,
            });
          }
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchServiceData();
  }, [id, backendUrl, aToken]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      // Append the image if selected
      if (serviceImg instanceof File) {
        formData.append('image', serviceImg);
      }

      formData.append('name', serviceData.name);
      formData.append('description', serviceData.description);
      formData.append('fees', Number(serviceData.fees));

      const { data } = await axios.put(`${backendUrl}/api/admin/edit-service/${id}`, formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);
        navigate('/service-list');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Edit Service</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-scroll">
        {/* Service Image */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="service-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={serviceImg ? URL.createObjectURL(serviceImg) : serviceData.image || 'your_default_image_url'}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setServiceImg(e.target.files[0])}
            type="file"
            id="service-img"
            hidden
          />
          <p>Upload Service Image</p>
        </div>

        {/* Service Form Fields */}
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Service Name</p>
              <input
                onChange={(e) => setServiceData({ ...serviceData, name: e.target.value })}
                value={serviceData.name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Service Description</p>
              <textarea
                onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
                value={serviceData.description}
                className="w-full px-4 pt-2 border rounded"
                placeholder="Service Description"
                rows={5}
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                onChange={(e) => setServiceData({ ...serviceData, fees: e.target.value })}
                value={serviceData.fees}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full">
          Edit Service
        </button>
      </div>
    </form>
  );
};

export default EditService;
