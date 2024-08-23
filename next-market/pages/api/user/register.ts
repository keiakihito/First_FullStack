import connectDB from "../../../utils/database";
import {UserModel} from "../../../utils/schemaModels";
import type {NextApiResponse} from "next";
import {ExtendedNextApiRequestUser, ResMessageType} from "../../../utils/types";


const registerUser = async (req: ExtendedNextApiRequestUser, res: NextApiResponse<ResMessageType>) => {
let debug: boolean = false;

    try{
        await connectDB();
        if(debug){
            console.log("Request Body to DB:", req.body);
        }
        const newUser = await UserModel.create(req.body);
        if(debug){
            console.log("User Create to DB:", newUser);
        }
        return res.status(200).json({message: "Success to create a new user registration "});
    }catch(err){
        return res.status(400).json({message:"Failed to create a new user"});
    }

}

export default registerUser;