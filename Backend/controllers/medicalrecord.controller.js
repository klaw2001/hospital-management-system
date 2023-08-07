import medicalrecordModel from "../models/medicalrecord.model";

export const getRecords = async (req, res) => {
  try {
    const recData = await medicalrecordModel.aggregate([
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

    if (recData) {
      return res.status(200).json({
        data: recData,
        msg: "Success",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.msg,
    });
  }
};
export const getSingleRecords = async (req, res) => {
  try {
    const medrecID = req.params.medicalrecord_id;
    const recData = await medicalrecordModel.findOne({_id:medrecID})

    if (recData) {
      return res.status(200).json({
        data: recData,
        msg: "Success",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.msg,
    });
  }
};

export const addRecords = (req, res) => {
  try {
    const {
      patientID,
      doctorID,
      diagnosis,
      prescription,
      labtestresults,
      treatmenthistory,
    } = req.body;
    const recData = new medicalrecordModel({
      patientID,
      doctorID,
      diagnosis,
      prescription,
      labtestresults,
      treatmenthistory,
    });
    recData.save();
    if (recData) {
      return res.status(201).json({
        data: recData,
        msg: "Medical Record Added!",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.msg,
    });
  }
};

export const updateRecords = async (req, res) => {
  try {
    const medrecID = req.params.medicalrecord_id;
    const {
      patientID,
      doctorID,
      diagnosis,
      prescription,
      labtestresults,
      treatmenthistory,
    } = req.body;
    const recData = await medicalrecordModel.updateOne(
      { _id: medrecID },
      {
        $set: {
          patientID,
          doctorID,
          diagnosis,
          prescription,
          labtestresults,
          treatmenthistory,
        },
      }
    );
    if (recData.acknowledged) {
      return res.status(200).json({
        data: recData,
        msg: "Medical Record Updated!",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.msg,
    });
  }
};

export const deleteRecords = async (req, res) => {
  try {
    const medrecID = req.params.medicalrecord_id;
    const recData = await medicalrecordModel.deleteOne({ _id: medrecID });
    if (recData.acknowledged) {
      return res.status(200).json({
        msg: "Medical Record Deleted!",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.msg,
    });
  }
};
