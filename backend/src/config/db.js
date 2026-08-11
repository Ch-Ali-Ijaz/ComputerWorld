import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB connected Successfully!!!");
    }catch(error){
        console.log("Error connecting MONGODB", error);
        process.exit(1); //exit with failure.
    }
}