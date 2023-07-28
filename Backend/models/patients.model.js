import mongoose from "mongoose";

const Schema = mongoose.Schema

const PatientsSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    dateofbirth:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","other"],
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
})

export default mongoose.model("Patient",PatientsSchema)