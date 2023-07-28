import appointmentModel from "../models/appointment.model";

export const getAppointments = async (req, res) => {
  try {
    const appData = await appointmentModel.aggregate([
      {
        $lookup: {
          from: "patients",
          localField: "patientID",
          foreignField: "_id",
          as: "patients",
        },
      },
      {
        $unwind: "$patients",
      },
      {
        $lookup: {
          from: "doctor`",
          localField: "doctorID",
          foreignField: "_id",
          as: "doctors",
        },
      },
      {
        $unwind: "$doctors",
      },
    ]);
    
    if (appData) {
      return res.status(200).json({
        data: appData,
        msg: "Success",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.msg,
    });
  }
};

export const addAppoinment = (req, res) => {
  try {
    const { patientID, doctorID, appointmentDate, appointmentTime } = req.body;
    const appData = new appointmentModel({
      patientID,
      doctorID,
      appointmentTime,
      appointmentDate,
    });
    appData.save();
    if (appData) {
      return res.status(201).json({
        data: appData,
        msg: "Appointment Added!",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.msg,
    });
  }
};

export const updateAppoinment = async (req, res) => {
  try {
    const appID = req.params.appointment_id;
    const { patientID, doctorID, appointmentDate, appointmentTime } = req.body;
    const appData = await appointmentModel.updateOne(
      { _id: appID },
      {
        $set: {
          patientID,
          doctorID,
          appointmentTime,
          appointmentDate,
        },
      }
    );
    if (appData.acknowledged) {
      return res.status(200).json({
        data: appData,
        msg: "Appointment Updated!",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.msg,
    });
  }
};

export const deleteAppoinment = async (req, res) => {
  try {
    const appID = req.params.appointment_id;
    const appData = await appointmentModel.deleteOne({ _id: appID });
    if (appData.acknowledged) {
      return res.status(200).json({
        msg: "Appointment Deleted!",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.msg,
    });
  }
};
