import type{NextApiRequest, NextApiResponse} from "next";
import jwt from "jsonwebtoken";
const secret_key = "nextmarket"


interface DecodedType{
    email: string
}

interface ExtendedNextApiRequestAuth extends NextApiRequest {

    headers:{
        authorization:string
    }

    body:{
        email: string
    }
}

interface ResMessageType{
    message: string
}


const auth =(handler: Function) => {
    return async(req: ExtendedNextApiRequestAuth, res: NextApiResponse<ResMessageType>)=>{
        if(req.method === "GET"){
            //When the user requests the get, it displays and ends auth.
            return handler(req,res);
        }

        // const token = await req.headers.authorization.split(" ")[1]\;
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlAxQGdtYWlsLmNvbSIsImlhdCI6MTcyNDE5MDUxNCwiZXhwIjoxNzI0MjczMzE0fQ.ICi5UYNfjZJhhS8P4LJ2lt0BsrMt400G44HJ07KZaC4"

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