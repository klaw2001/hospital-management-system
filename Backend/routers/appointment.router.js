import express from 'express'
import { addAppoinment, deleteAppoinment, getAppointments, updateAppoinment } from '../controllers/appointment.controller'
import checkRole from '../middleware/check.middleware'

const appointmentRouter = express.Router()

appointmentRouter.get('/get-appointments',checkRole,getAppointments)
appointmentRouter.post('/add-appointment',addAppoinment)
appointmentRouter.put('/update-appointment/:appointment_id',updateAppoinment)
appointmentRouter.delete('/delete-appointment/:appointment_id',deleteAppoinment)
export default appointmentRouter