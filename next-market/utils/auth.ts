import type{NextApiResponse} from "next";
import {ExtendedNextApiRequestAuth, DecodedType, ResMessageType} from "./types";
import jwt from "jsonwebtoken";
const secret_key = "nextmarket"



const auth =(handler: Function) => {
    return async(req: ExtendedNextApiRequestAuth, res: NextApiResponse<ResMessageType>)=>{
        if(req.method === "GET"){
            //When the user requests the get, it displays and ends auth.
            return handler(req,res);
        }

        const token = await req.headers.authorization.split(" ")[1];

        if(!token){
            return res.status(401).json({message:"No token provided"});
        }

        try{
            const decoded = jwt.verify(token, secret_key);
            console.log(decoded);
            //Check the user update the same user information
            //When the user email in token and email in the item match, the update happens.
            //Store email information in req.body.email
            req.body.email = (decoded as DecodedType).email
            return handler(req, res);
        }catch(err){
            //In this case token may be expired.
            return res.status(401).json({message:"Invalid token, need to login."});
        }
    }// end of async
} // end of auth

export default auth;