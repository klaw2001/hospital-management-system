import doctorModel from "../models/doctor.model";


export const getDoctors = async (req, res) => {
  try {
    const doctorData = await doctorModel.find();
    if (doctorData) {
      return res.status(200).json({
        data: doctorData,
        msg: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const addDoctor = (req, res) => {
  try {
    const { firstname, lastname, specialization } = req.body;
    const doctorData = new doctorModel({
      firstname,
      lastname,
      specialization
    });
    doctorData.save();
    if (doctorData) {
      return res.status(201).json({
        data: doctorData,
        msg: "Doctor Info Added",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const doctorID = req.params.doctor_id;
    const { firstname, lastname,specialization } = req.body;
    const doctorData = await doctorModel.updateOne(
      { _id: doctorID },
      {
        $set: {
          firstname,
          lastname,
          specialization
        },
      }
    );
    if (doctorData.acknowledged) {
        return res.status(200).json({
          data: doctorData,
          msg: "Doctor Info Updated",
        });
      }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const doctorID = req.params.doctor_id;
    const doctorData = await doctorModel.deleteOne({_id:doctorID});
    if(doctorData.acknowledged){
        return res.status(200).json({
            msg: "Doctor Info Deleted",
          });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};
