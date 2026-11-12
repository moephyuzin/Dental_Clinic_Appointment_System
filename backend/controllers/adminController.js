import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"
import serviceModel from "../models/serviceModel.js"

// API for adding doctor
const addDoctor = async (req, res) => {

    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        //checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            console.log("Request Body:", req.body);
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageURL = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageURL,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save(); //  Add the parentheses here

        console.log("Doctor saved:", newDoctor);

        res.json({ success: true, message: "Doctor Added", data: newDoctor });



    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

//api for adding service
const addService = async (req,res) => {

    try {
        const { name, fees, description } = req.body
        const imageFile = req.file

        //checking for all data to add service
        if (!name || !fees || !description ) {
            console.log("Request Body:", req.body);
            return res.json({success:false,message:"Missing Details"})
        }

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageURL = imageUpload.secure_url 

        const serviceData = {
            name,
            description,
            fees,
            image: imageURL
        }

        const newService = new serviceModel(serviceData);
        await newService.save(); //  Add the parentheses here

        console.log("Service saved:", newService);

        res.json({ success: true, message: "Service Added", data: newService });

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }
}


// API for admin Login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to get all doctor lists
const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to get appointment lists
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for appointment cancellation (admin)
const cancelAppointmentAdmin = async (req, res) => {
    try {
        const { appointmentId } = req.body;


        const appointmentData = await appointmentModel.findById(appointmentId)


        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //releasing doctor slot

        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled.' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//api for getting dashboard data
const adminDashboard = async (req,res) => {
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const allServices = async (req,res) => {
    try {

        const services = await serviceModel.find({})
        res.json({success:true, services})

    } catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params; // Get the doctor ID from the URL parameters

    // Find and delete the doctor by ID
    const deletedDoctor = await doctorModel.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for editing doctor details
const editDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Basic validation
        if (!name || !email || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing required details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        const updateData = {
            name,
            email,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
        };

        // If password provided, validate and hash it
        if (password && password.trim() !== '') {
            if (password.length < 8) {
                return res.json({ success: false, message: "Password must be at least 8 characters" });
            }
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        // If new image provided, upload to Cloudinary
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            updateData.image = imageUpload.secure_url;
        }

        const updatedDoctor = await doctorModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedDoctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        res.json({ success: true, message: "Doctor updated successfully", data: updatedDoctor });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API for editing service details
const editService = async (req, res) => {
    try {
        const { name, fees, description } = req.body;
        const imageFile = req.file;

        // Basic validation
        if (!name || !fees || !description) {
            return res.json({ success: false, message: "Missing required details" });
        }

        const updateData = {
            name,
            fees,
            description
        };

        // If new image provided, upload to Cloudinary
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            updateData.image = imageUpload.secure_url;
        }

        const updatedService = await serviceModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedService) {
            return res.json({ success: false, message: "Service not found" });
        }

        res.json({ success: true, message: "Service updated successfully", data: updatedService });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to delete a service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params; // Get the service ID from the URL parameters

    // Find and delete the service by ID
    const deletedService = await serviceModel.findByIdAndDelete(id);

    if (!deletedService) {
      return res.json({ success: false, message: "Service not found" });
    }

    res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



export { addDoctor, editDoctor,deleteDoctor, loginAdmin, allDoctors,addService,editService,deleteService ,allServices, appointmentsAdmin, cancelAppointmentAdmin, adminDashboard }