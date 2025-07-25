import mongoose from "mongoose"

export default async function connectToDB () {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        const connection = mongoose.connection;

        connection.on("connected" , ()=> {
            console.log("Connection says Mongo db connected")
        })

        connection.on("error" , (err)=> {
            console.log("Connection says - tere was an erroe connecting to mongo db");
            console.log(err);
            process.exit();
        })

        console.log("Connected to MongoDB");
    } catch (err){
        console.log("Something went wront connecting to db", err);
    }
}

