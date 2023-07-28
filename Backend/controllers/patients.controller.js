import patientsModel from "../models/patients.model";

export const getPatients = async (req, res) => {
  try {
    const patientData = await patientsModel.find();
    if (patientData) {
      return res.status(200).json({
        data: patientData,
        msg: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const getSinglePatient = async (req, res) => {
  try {
    const patientID = req.params.patient_id;
    const patientData = await patientsModel.findOne({_id:patientID});
    if (patientData) {
      return res.status(200).json({
        data: patientData,
        msg: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const addPatient = (req, res) => {
  try {
    const { firstname, lastname, dateofbirth, gender, email, phone } = req.body;
    const patientData = new patientsModel({
      firstname,
      lastname,
      dateofbirth,
      gender,
      email,
      phone,
    });
    patientData.save();
    if (patientData) {
      return res.status(201).json({
        data: patientData,
        msg: "Patient Info Added",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patientID = req.params.patient_id;
    const { firstname, lastname, dateofbirth, gender, email, phone } = req.body;
    const patientData = await patientsModel.updateOne(
      { _id: patientID },
      {
        $set: {
          firstname,
          lastname,
          dateofbirth,
          gender,
          email,
          phone,
        },
      }
    );
    if (patientData.acknowledged) {
      return res.status(200).json({
        data: patientData,
        msg: "Patient Info Updated",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const deletPatient = async (req, res) => {
  try {
    const patientID = req.params.patient_id;
    const patientData = await patientsModel.deleteOne({ _id: patientID });
    if (patientData.acknowledged) {
      return res.status(200).json({
        msg: "Patient Info Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};
