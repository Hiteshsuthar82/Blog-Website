// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";


// const connectDB = async () => {
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
//     } catch (error) {
//         console.log("MONGODB connection FAILED ", error);
//         process.exit(1)
//     }
// }

// export default connectDB


import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.NODE_ENV === "development" 
            ? process.env.MONGODB_URI 
            : process.env.LOCAL_DB_URL;

        const connectionInstance = await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);

        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
}


export default connectDB;
