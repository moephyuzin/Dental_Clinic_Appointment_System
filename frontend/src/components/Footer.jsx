import React from 'react';
import { assets } from '../assets/assets';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt  } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>
        {/* Left */}
        <div>
          <img src={assets.logo} alt="" className="h-20 w-auto cursor-pointer mb-5" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            MD Dental Clinic is committed to delivering high-quality dental care with compassion and professionalism. From general check-ups to advanced treatments, we aim to make every visit comfortable and effective. Convenient online appointment booking and personalized care make us your trusted partner in oral health.
          </p>
        </div>
        
        {/* Center */}
        <div>
          <p className='text-xl font-medium mb-5'>Quick Link</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>Doctors</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Right */}
        <div>
          <p className='text-xl font-medium mb-5'>Contact Us</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              817B Thirizayar Street, Yangon
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-primary" />
              +959-250-678-090
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-primary" />
              <a href="mailto:mddental@gmail.com" className="text-primary">mddental@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ MD Dental Clinic</p>
      </div>
    </div>
  );
};

export default Footer;
