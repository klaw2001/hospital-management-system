import mongoose from "mongoose";
import patientsModel from "./patients.model";

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  patientID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  doctorID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Appointment",AppointmentSchema)