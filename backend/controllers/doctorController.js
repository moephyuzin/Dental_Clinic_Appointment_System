import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailability = async (req,res) => {
    try {
        
        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success:true, message: 'Availability Changed'})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const doctorList = async (req,res) => {

    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({success:true,doctors})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// api for login for doctor
const loginDoctor = async (req,res) => {
    try {
        const {email,password} = req.body
        const doctor = await doctorModel.findOne({email})
        
        if (!doctor) {
            return res.json({success:false,message:'Invalid Credentials!!'})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:'Invalid Credentials!!'})
        }


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// api to get doctoe appointment(Doctor)
const appointmentsDoctor = async (req,res)=>{

    try {
        const docId = req.doctor.docId
        const appointments =  await appointmentModel.find({docId})

        res.json({success:true, appointments})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api for appointment completed(Doctor)
const appointmentComplete = async (req,res) => {
    try {
        const  docId = req.doctor.docId
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
            return res.json({success:true,message:'Appointmemt Completed.'})
        }else{
            return res.json({success:false,message:'Complitation Failed!'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//api for appointment cancelled(Doctor)
const appointmentCancel = async (req,res) => {
    try {
        const  docId = req.doctor.docId
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
            return res.json({success:true,message:'Cancelled Appointment!'})
        }else{
            return res.json({success:false,message:'Cancellation Failed!'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api to get dashboard data(doctor)
const doctorDashboard = async (req, res)=>{
    try {
        const  docId = req.doctor.docId
        const appointments = await appointmentModel.find({docId})
        let earnings = 0
        appointments.map((item)=>{
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })
        let patients = []
        
        appointments.map((item)=>{
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
                
            }
        })

        const dashData ={
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api to get doctor profile
const doctorProfile = async (req,res)=>{
    try {
        const  docId = req.doctor.docId
        const profileData = await doctorModel.findById(docId).select('-[password')

        res.json({success:true,profileData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api to update doctor data
const updateDoctorProfile = async (req,res)=>{
    try {
        const  docId = req.doctor.docId
        const {fees, address, available} = req.body

        await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
        res.json({success:true,message:'Profile Updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
export {changeAvailability, doctorList, 
    loginDoctor, appointmentsDoctor, 
    appointmentCancel, 
    appointmentComplete,
    doctorProfile,
    doctorDashboard,updateDoctorProfile}