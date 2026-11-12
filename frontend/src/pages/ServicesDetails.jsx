import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const { services, currencySymbol } = useContext(AppContext);

  const [serviceInfo, setServiceInfo] = useState(null);

  const fetchServiceInfo = () => {
    const foundService = services.find(svc => String(svc._id) === String(serviceId));
    setServiceInfo(foundService || null);
  };

  useEffect(() => {
    fetchServiceInfo();
  }, [services, serviceId]);

  return serviceInfo && (
    <div>
      {/* Service Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={serviceInfo.image}
            alt={serviceInfo.name}
          />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/* Service Info */}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {serviceInfo.name} <img className="w-5" src={assets.verified_icon} alt="" />
          </p>

          {/* About Service */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {serviceInfo.description}
            </p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Service Fee: <span className="text-gray-600">
              {currencySymbol}{serviceInfo.fees}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
