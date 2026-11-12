import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { assets } from '../../assets/assets';

const EditDoctor = () => {
    const { id } = useParams();
    const { backendUrl, aToken } = useContext(AdminContext);
     const navigate = useNavigate();

    const [doctorData, setDoctorData] = useState({
        name: '',
        email: '',
        password: '',
        experience: '1 Year',
        fees: '',
        speciality: 'Orthodontics',
        about: '',
        degree: '',
        address1: '',
        address2: '',
        image: null,
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchDoctorData = async () => {
            if (!aToken) return;

            try {
                const { data } = await axios.post(
                    `${backendUrl}/api/admin/all-doctors`,
                    {},
                    { headers: { aToken } }
                );

                if (data.success) {
                    const doctor = data.doctors.find((d) => d._id === id);
                    if (doctor) {
                        setDoctorData({
                            name: doctor.name || '',
                            email: doctor.email || '',
                            password: '',
                            experience: doctor.experience || '1 Year',
                            fees: doctor.fees || '',
                            speciality: doctor.speciality || 'Orthodontics',
                            about: doctor.about || '',
                            degree: doctor.degree || '',
                            address1: doctor.address?.line1 || '',
                            address2: doctor.address?.line2 || '',
                            image: doctor.image || null,
                        });
                    }
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchDoctorData();
    }, [id, backendUrl, aToken]);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();

            if (doctorData.image instanceof File) {
                formData.append('image', doctorData.image);
            }

            formData.append('name', doctorData.name);
            formData.append('email', doctorData.email);

            // Only append password if not empty
            if (doctorData.password.trim() !== '') {
                formData.append('password', doctorData.password);
            }

            formData.append('experience', doctorData.experience);
            formData.append('fees', Number(doctorData.fees));
            formData.append('about', doctorData.about);
            formData.append('speciality', doctorData.speciality);
            formData.append('degree', doctorData.degree);
            formData.append(
                'address',
                JSON.stringify({ line1: doctorData.address1, line2: doctorData.address2 })
            );

            const { data } = await axios.put(
                `${backendUrl}/api/admin/edit-doctor/${id}`,
                formData,
                { headers: { aToken } }
            );

            if (data.success) {
                toast.success(data.message);
                 navigate('/doctor-list');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="m-5 w-full">
            <p className="mb-3 text-lg font-medium">Edit Doctor</p>
            <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-scroll">
                {/* Doctor Image */}
                <div className="flex items-center gap-4 mb-8 text-gray-500">
                    <label htmlFor="doc-img">
                        <img
                            className="w-16 bg-gray-100 rounded-full cursor-pointer"
                            src={
                                doctorData.image instanceof File
                                    ? URL.createObjectURL(doctorData.image)
                                    : doctorData.image || assets.upload_area
                            }
                            alt=""
                        />
                    </label>
                    <input
                        onChange={(e) => setDoctorData({ ...doctorData, image: e.target.files[0] })}
                        type="file"
                        id="doc-img"
                        hidden
                    />
                    <p>
                        Upload Doctor <br /> Picture
                    </p>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Name</p>
                            <input
                                onChange={(e) => setDoctorData({ ...doctorData, name: e.target.value })}
                                value={doctorData.name}
                                className="border rounded px-3 py-2"
                                type="text"
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Email</p>
                            <input
                                onChange={(e) => setDoctorData({ ...doctorData, email: e.target.value })}
                                value={doctorData.email}
                                className="border rounded px-3 py-2"
                                type="email"
                                placeholder="Email"
                                required
                            />
                        </div>

                        {/* Password Field with Show/Hide Toggle */}
                        <div className="flex-1 flex flex-col gap-1 relative">
                            <p>Doctor Password (leave blank to keep current)</p>
                            <input
                                onChange={(e) => setDoctorData({ ...doctorData, password: e.target.value })}
                                value={doctorData.password}
                                className="border rounded px-3 py-2 pr-10"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[38px] cursor-pointer transition-colors duration-200"
                                style={{ color: showPassword ? '#003359' : '#888' }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#003359')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = showPassword ? '#003359' : '#888')}
                            >
                                {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                            </span>
                        </div>

                        {/* Other Fields */}
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Experience</p>
                            <select
                                onChange={(e) => setDoctorData({ ...doctorData, experience: e.target.value })}
                                value={doctorData.experience}
                                className="border rounded px-3 py-2"
                            >
                                {[...Array(10)].map((_, i) => (
                                    <option key={i} value={`${i + 1} Year`}> 
                                        {i + 1} Year
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Fees</p>
                            <input
                                onChange={(e) => setDoctorData({ ...doctorData, fees: e.target.value })}
                                value={doctorData.fees}
                                className="border rounded px-3 py-2"
                                type="number"
                                placeholder="Fees"
                                required
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Speciality</p>
                            <select
                                onChange={(e) => setDoctorData({ ...doctorData, speciality: e.target.value })}
                                value={doctorData.speciality}
                                className="border rounded px-3 py-2"
                            >
                                <option value="Orthodontics">Orthodontics</option>
                                <option value="Endodontics">Endodontics</option>
                                <option value="Prosthodontics">Prosthodontics</option>
                                <option value="Pediatric Dentistry">Pediatric Dentistry</option>
                                <option value="Oral and Maxillofacial Surgery">Oral and Maxillofacial Surgery</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Education</p>
                            <input
                                onChange={(e) => setDoctorData({ ...doctorData, degree: e.target.value })}
                                value={doctorData.degree}
                                className="border rounded px-3 py-2"
                                type="text"
                                placeholder="Education"
                                required
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Address</p>
                            <input
                                onChange={(e) => setDoctorData({ ...doctorData, address1: e.target.value })}
                                value={doctorData.address1}
                                className="border rounded px-3 py-2"
                                type="text"
                                placeholder="Address 1"
                                required
                            />
                            <input
                                onChange={(e) => setDoctorData({ ...doctorData, address2: e.target.value })}
                                value={doctorData.address2}
                                className="border rounded px-3 py-2"
                                type="text"
                                placeholder="Address 2"
                                required
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <p className="mt-4 mb-2">About Doctor</p>
                            <textarea
                                onChange={(e) => setDoctorData({ ...doctorData, about: e.target.value })}
                                value={doctorData.about}
                                className="w-full px-4 pt-2 border rounded"
                                placeholder="Write about doctor"
                                rows={5}
                                required
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full">
                    Edit Doctor
                </button>
            </div>
        </form>
    );
};

export default EditDoctor;


