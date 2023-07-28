import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const getUsers = async (req, res) => {
  try {
    const userData = await userModel.find();
    if (userData) {
      return res.status(200).json({
        data: userData,
        msg: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const addUser = (req, res) => {
  try {
    const { username, password, role } = req.body;
    let hashpassword = bcrypt.hashSync(password, 10);
    const userData = new userModel({
      username,
      password: hashpassword,
      role,
    });
    userData.save();
    if (userData) {
      return res.status(201).json({
        data: userData,
        msg: "User Added",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userID = req.params.user_id;
    const { username, password, role } = req.body;
    const userData = await userModel.findOne({ _id: userID });
    let hashedPassword = userData.password;
    if (password) {
      hashedPassword = bcrypt.hashSync(password, 10);
    }
    const updatedData = await userModel.updateOne(
      { _id: userID },
      {
        $set: {
          username,
          password: hashedPassword,
          role,
        },
      }
    );
    if (updatedData.acknowledged) {
      return res.status(200).json({
        data: updatedData,
        msg: "User Data Updated",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userID = req.params.user_id;
    const removeData = await userModel.deleteOne({ _id: userID });
    if (removeData.acknowledged) {
      return res.status(200).json({
        msg: "User Deleted Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existUser = await userModel.findOne({ username: username });
    if (!existUser) {
      return res.status(400).json({
        msg: "User Does Not Exist",
      });
    }
    const passwordComapre = bcrypt.compare(password, existUser.password);
    if (!passwordComapre) {
      return res.status(400).json({
        msg: "Wrong Password",
      });
    }

    const token = jwt.sign(
      {
        id: existUser.id,
        username: existUser.username,
        role:existUser.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      data: existUser,
      token: token,
      
      msg: "Login Successfull!",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.msg,
    });
  }
};
