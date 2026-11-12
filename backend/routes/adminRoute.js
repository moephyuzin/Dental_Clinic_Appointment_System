import express from 'express'
import { addDoctor, editDoctor, allDoctors, deleteDoctor,appointmentsAdmin, loginAdmin, cancelAppointmentAdmin, adminDashboard, addService, allServices,editService,deleteService} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.put('/edit-doctor/:id', authAdmin, upload.single('image'), editDoctor);
adminRouter.delete('/delete-doctor/:id', authAdmin, deleteDoctor);
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors',authAdmin, allDoctors)
adminRouter.post('/change-availability',authAdmin, changeAvailability)
adminRouter.post('/add-service', authAdmin,upload.single('image'), addService)
adminRouter.post('/all-services',authAdmin, allServices)
adminRouter.put("/edit-service/:id", authAdmin, upload.single("image"), editService);
adminRouter.delete('/delete-service/:id', authAdmin, deleteService);
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,cancelAppointmentAdmin)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter