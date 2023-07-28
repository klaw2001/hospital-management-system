import express from "express";
import {
  addDoctor,
  deleteDoctor,
  getDoctors,
  updateDoctor,
} from "../controllers/doctor.controller";

const doctorRouter = express.Router();

doctorRouter.get("/get-doctors", getDoctors);
doctorRouter.post("/add-doctor", addDoctor);
doctorRouter.put("/update-doctor/:doctor_id", updateDoctor);
doctorRouter.delete("/delete-doctor/:doctor_id", deleteDoctor);

export default doctorRouter;
