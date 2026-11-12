import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt  } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12 pl-10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-12">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">CONTACT INFORMATION</h2>
          <p className="mb-4">
            Our MD Dental Clinic is located in 817B Thirizayar Street, near the Southokkalapa Police Station and Thu Mingalar Road, Southokkalapa Township, Yangon, Myanmar.
          </p>

          <div className="mb-4 pl-5">
            <p className="font-semibold text-lg">Operating Hours:</p>
            <ul className="list-disc pl-5">
              <li>Open: 9:00 AM – 8:00 PM</li>
              <li>Last Booking: 6:00 PM</li>
            </ul>
          </div>
          <p className="mb-10">
            We welcome you to visit us for exceptional dental care during our opening hours. For bookings, please ensure your appointment is made before 6:00 PM.
          </p>

          <h3 className="text-2xl font-medium mb-4">YANGON CENTER</h3>
          <p className="mb-2 flex items-center">
            <FaMapMarkerAlt  className="text-primary mr-2" /> 817B Thirizayar Street, Southokkalapa Tsp, Yangon
          </p>
          <p className="mb-2 flex items-center">
            <FaPhoneAlt className="text-primary mr-2" /> +959250678090
          </p>
          <p className="mb-2 flex items-center">
            <FaEnvelope className="text-primary mr-2" /> <a href="mailto:mddental@gmail.com" className="text-primary">mddental@gmail.com</a>
          </p>
        </div>

        <div className="w-full md:w-1/2 pr-10">
          <iframe
            title="Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7637.106115669888!2d96.16990449357908!3d16.848514400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c193006abd5905%3A0xd29f84857fda1fbd!2sMD%20Clinic!5e0!3m2!1sen!2smm!4v1753376218778!5m2!1sen!2smm"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
