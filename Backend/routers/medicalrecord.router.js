import express from 'express'
import { addRecords, deleteRecords, getRecords, updateRecords } from '../controllers/medicalrecord.controller'


const medicalRecordRouter = express.Router()

medicalRecordRouter.get('/get-records',getRecords)
medicalRecordRouter.post('/add-record',addRecords)
medicalRecordRouter.put('/update-record/:medicalrecord_id',updateRecords)
medicalRecordRouter.delete('/delete-record/:medicalrecord_id',deleteRecords)
export default medicalRecordRouter