import { Students, Teachers } from "../database/Models/Models.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


export const home = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        res.json({
            success: 'true',
            messsage: "logged out Successfully",
        })
    }
    else {
        res.json({
            success: 'false',
            messsage: "logged out Successfully",
        })
    }

}

export const studentRegister = async (req, res) => {
    const {
        name,
        scClass,
        school,
        email,
        number,
        password,

    } = req.body;

    let createdStudent = await Students.findOne({ email });

    if (createdStudent) {
        res.json({
            success: 'false',
            messsage: "Student Already Exists Plese Login!",
        })
    }
    else {
        const encryptesPassword = await bcrypt.hash(password, 10);
        createdStudent = await Students.create({
            name,
            scClass,
            school,
            email,
            number,
            password: encryptesPassword,
            category: "student"
        })

        const token = jwt.sign({ _id: createdStudent._id }, process.env.JWT_KEY);

        res.status(201).cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "none",
            secure: true,
        }).json({
            success: 'true',
            messsage: "Student Registered Successfully",
        })
    }
}

export const teacherRegister = async (req, res) => {

    const data = req.body;
    const {
        name,
        qualification,
        email,
        number,
        password,
    } = req.body;

    let createdTeacher = await Teachers.findOne({ email });
    if (createdTeacher) {
        res.json({
            success: 'false',
            messsage: "Teacher Already Exists Plese Login!",
        })
    }
    else {
        const encryptesPassword = await bcrypt.hash(password, 10);
        createdTeacher = await Teachers.create({
            name,
            qualification,
            email,
            number,
            password: encryptesPassword,
            category: "teacher",
        })

        const token = jwt.sign({ _id: createdTeacher._id }, process.env.JWT_KEY);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "none",
            secure: true,
        }).json({
            success: 'true',
            messsage: "Student Registered Successfully",
        })
    }

}

export const loginCheck = (req, res) => {
    const { token } = req.cookies;

    if (token) {
        res.json({
            success: false,
            messsage: "User Alredy Looged in"
        })
    }
}

export const login = async (req, res) => {
    const {
        email,
        password,
    } = req.body;

    let userLogin = await Students.findOne({ email });

    if (userLogin) {
        const passMatch = await bcrypt.compare(password, userLogin.password);
        if (passMatch) {
            const token = jwt.sign({ _id: userLogin._id }, process.env.JWT_KEY);
            // console.log("login token", token);

            res.status(201).cookie("token", token, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
                sameSite: "none",
                secure: true,
            }).json({
                success: 'true',
                messsage: "You are Logged in Successfully",
            })
        }
        else {
            res.json({
                success: 'false',
                messsage: "Invalid ID or Pass",
            })
        }
    }
    else {
        res.json({
            success: 'false',
            messsage: "User Doesn't Exists",
        })
    }
}

export const logout = async (req, res) => {


    res.status(201).cookie("token", null, {
        expires: new Date(Date.now()),
        sameSite: "none",
        secure: true,
    }).json({
        success: 'true',
        messsage: "logged out Successfully",
    })

}

export const teachers = async (req, res) => {
    const token = req.cookies;

    if (token) {
        const teachers = await Teachers.find({ category: "teacher" });
        res.status(201).json({
            success: 'true',
            data: teachers,
            messsage: "Teachers Accessed",
        })
    }
    else {
        res.status(201).json({
            success: 'false',
            messsage: "Login First",
        })
    }
}