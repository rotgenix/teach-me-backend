import mongoose from "mongoose";

export const studentSchema = mongoose.Schema({
    name: String,
    scClass: String,
    school: String,
    email: String,
    number: String,
    password: String,
    category: String,
})
export const teacherSchema = mongoose.Schema({
    name: String,
    qualification: String,
    email: String,
    number: String,
    password: String,
    category: String,
})

