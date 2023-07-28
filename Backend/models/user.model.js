import mongoose from "mongoose";
const Schema =  mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "doctor", "nurse", "receptionist"],
    required: true,
  },
});

export default mongoose.model("User",UserSchema)