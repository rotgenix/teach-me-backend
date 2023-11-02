import mongoose from "mongoose";
import { studentSchema, teacherSchema } from "../Schemas/Schemas.js";


export const Students = mongoose.model("Student", studentSchema);
export const Teachers = mongoose.model("Teacher", teacherSchema);