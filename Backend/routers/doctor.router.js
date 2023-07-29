import express from "express";
import {
  addDoctor,
  deleteDoctor,
  getDoctors,
  getSingleDoctor,
  updateDoctor,
} from "../controllers/doctor.controller";

const doctorRouter = express.Router();

doctorRouter.get("/get-doctors", getDoctors);
doctorRouter.get("/get-single-doctor/:doctor_id", getSingleDoctor);
doctorRouter.post("/add-doctor", addDoctor);
doctorRouter.put("/update-doctor/:doctor_id", updateDoctor);
doctorRouter.delete("/delete-doctor/:doctor_id", deleteDoctor);

export default doctorRouter;
