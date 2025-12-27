import mongoose from "mongoose";

const connectDB = async() =>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/ChitChat`);
        console.log("DATABASE connected successfully");
    }catch(error){
        console.log(error.message);
    }
}


export default connectDB;