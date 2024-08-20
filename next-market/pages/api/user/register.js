import connectDB from "../../../utils/database"
import {UserModel} from "../../../utils/schemaModels"


const registerUser = async (req, res) => {

    try{
        await connectDB();
        await UserModel.create(req.body);
        return res.status(200).json({message: "Success to create a new user registration "});
    }catch(err){
        return res.status(400).json({message:"Failed to create a new user"});
    }

}

export default registerUser;