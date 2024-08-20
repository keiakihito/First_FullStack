import mongoose from "mongoose"

const connectDB = async() =>{
    try{
        await mongoose.connect("mongodb+srv://kkatsumi:X7UmuaoGi6VV0WQO@first-create-fullstack.ugq5m.mongodb.net/?retryWrites=true&w=majority&appName=First-Create-FullStack")
        console.log("Success: Connected to MongoDB")
    }catch(err){
        console.log("Failure: Unconnected to MongoDB")
        throw new Error()
    }
}

export default connectDB