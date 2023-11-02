import mongoose from "mongoose";


export const connectMongo = () => {
    mongoose
        .connect(process.env.MONGODB_URL, {
            dbName: "teachMe",
        })
        .then((c) => {
            // console.log(`Database Connected with ${c.connection.host}`);
        })
        .catch((e) => {
            // console.log(e);
        })
}