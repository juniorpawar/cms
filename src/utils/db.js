import mongoose from "mongoose"

export default async function connectToDB () {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to MongoDB");
    } catch (err){
        console.log("Error connecting to MongoDB:", err);
    }
}

