import express from 'express'
import { addPatient, deletPatient, getPatients, getSinglePatient, updatePatient } from '../controllers/patients.controller'

const patientRouter = express.Router()

patientRouter.get('/get-patients',getPatients)
patientRouter.get('/get-single-patient/:patient_id',getSinglePatient)
patientRouter.post('/add-patient',addPatient)
patientRouter.put('/update-patient/:patient_id',updatePatient)
patientRouter.delete('/delete-patient/:patient_id',deletPatient)

export default patientRouter