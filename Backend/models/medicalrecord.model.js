import mongoose from "mongoose";
import patientsModel from "./patients.model";

const Schema = mongoose.Schema;

const MedicalRecordScehma = new Schema({
  patientID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  doctorID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  prescription: {
    type: String,
    required: true,
  },
  labtestresults: {
    type: String,
    required: true,
  },
  treatmenthistory: {
    type: String,
    required: true,
  },
});

export default mongoose.model("MedicalRecord",MedicalRecordScehma)