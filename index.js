import express from "express";

import cookieParser from "cookie-parser";

import cors from 'cors'
import { home, login, loginCheck, logout, studentRegister, teacherRegister, teachers } from "./Controllers/Controller.js";
import { connectMongo } from "./database/ConnectMongo.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

import { config } from 'dotenv'

config({
    path: './Utils/config.env'
})

app.use(cors({
    origin: [process.env.FRONT_ENDURL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

connectMongo();

app.get('/', (req, res) => {
    res.json({
        messsage: "hsh",
    })
})

app.get('/home', home)

app.post('/studentregister', studentRegister)

app.post('/teacherregister', teacherRegister);

app.get('/login', loginCheck)

app.post('/login', login)

app.get('/logout', logout)

app.get('/teachers', teachers)

app.listen(process.env.PORT, () => {
    console.log("server is ready", process.env.PORT);
    console.log("server is ready", process.env.FRONT_ENDURL);
})