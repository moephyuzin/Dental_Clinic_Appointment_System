import React from 'react'
import { assets } from '../assets/assets'


const About = () => {
  return (
    <div className='mt-12'>
      <div className="text-3xl text-black pl-20">
        <p className='font-semibold'>About Us</p>
      </div>

      <div className="my-12 flex flex-col md:flex-row-reverse items-center justify-between gap-8 pl-20 mt-0">
        <div className="flex justify-between pr-20">
          <img className="w-full md:max-w-[535px] rounded-lg" src={assets.about_image} alt="Team" />
        </div>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-black">
          <p className="text-lg">
            Welcome to MD Dental Clinic, where exceptional dental care meets compassion and professionalism. Our mission is to provide comprehensive dental solutions in a comfortable and welcoming environment. We believe in delivering quality care that empowers you to achieve and maintain a healthy, beautiful smile.
          </p>
          <p className="text-lg">
            Our dedicated team of experienced professionals is here to guide you through every step of your dental journey, from preventive care to advanced treatments. Whether you need a routine checkup or a specialized procedure, we’re committed to helping you feel confident in your smile.
          </p>
          <p className="text-lg">
            Let us be your trusted partner in achieving lifelong oral health.
          </p>
        </div>
      </div>

      {/* why choose us */}
      <div className='mt-24 mb-32'>
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Image on the Left Side */}
          <div className="pl-20 md:w-[550px]">
            <img className="w-full h-auto rounded-lg" src={assets.why} alt="About Image" />
          </div>

          {/* Text and Cards on the Right Side */}
          <div className="w-full md:w-2/3 pr-20 flex flex-col gap-6">
            <div className="text-center text-3xl text-black mb-0">
              <p className="font-semibold">Why Choose Us</p>
            </div>
            <div className='pl-11 pr-15 mb-1 md:w-[700px]'>
              <p className='text-base text-center'>
                We combine expert care with personalized service to ensure the highest quality of dental treatment. Our experienced team is committed to making every visit comfortable and effective, using the latest techniques to achieve the best results for your smile.
              </p>
            </div>

            <div className="bg-primary p-4 rounded-lg shadow-lg text-left md:w-[650px] mx-auto flex items-center gap-4">
              <div className="bg-primary p-4 rounded-full">
                <img src={assets.efficiency} alt="" />
              </div>
              <div>
                <p className="text-xl text-white font-medium mb-2">Efficiency</p>
                <p className="text-sm text-white">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
              </div>
            </div>

            <div className="bg-primary p-4 rounded-lg shadow-lg text-left md:w-[650px] mx-auto flex items-center gap-4">
              <div className="bg-primary p-4 rounded-full">
                <img src={assets.convenience} alt="" />
              </div>
              <div>
                <p className="text-xl text-white font-medium mb-2">Convenience</p>
                <p className="text-sm text-white">Access to a network of trusted healthcare professionals in your area.</p>
              </div>
            </div>

            <div className="bg-primary p-4 rounded-lg shadow-lg text-left md:w-[650px] mx-auto flex items-center gap-4">
              <div className="bg-primary p-4 rounded-full">
                <img src={assets.personalization} alt="" />
              </div>
              <div>
                <p className="text-xl text-white font-medium mb-2">Personalization</p>
                <p className="text-sm text-white">Tailored recommendations and reminders to help you stay on top of your health.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default About

