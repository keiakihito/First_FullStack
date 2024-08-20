import jwt from "jsonwebtoken"; // JSON token lets user stay in the account
import connectDB from "../../../utils/database";
import {UserModel} from "../../../utils/schemaModels";

const secret_key = "nextmarket";


const loginUser = async (req, res) => {

    try{
        await connectDB();
        //Check the user is registered user or not
        //If not, register first.
        const savedUserData = await UserModel.findOne({email: req.body.email});
        if(savedUserData){
            //This case user is already registered and log in
            if(req.body.password == savedUserData.password){
                // This case user account exits && match the password
                //payload needs for create JSON token with jwd.sign
                const payload = {
                    email: req.body.email,
                }
                //Token lets user stay in the account up to 23h.
                const token = jwt.sign(payload, secret_key, {expiresIn: "23h"});
                console.log(token);
                return res.status(200).send({message:"Succeed to login", token: token});
            }else{
                // User account exists, but password does not match.
                return res.status(400).send({message:"Failed to login: Wrong password"});
            }
        }else{
            //User does not have an account yer.
            return res.status(400).send({message:"Failed to login: Please create a new user account"});
        }

    }catch(err){
        return res.status(400).send({message:"Failed to login"});
    }
}

export default loginUser;