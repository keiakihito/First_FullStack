//Custom hook file
// It checks whether user login or not.

import {useState, useEffect} from "react"; // useEffect perform before pages are displayed.
import {useRouter} from "next/router";
import jwt from "jsonwebtoken";

// const secret_key = "nextmarket";
const debug = false;


const useAuth =()=> {

    const [loginUser, setLoginUser] = useState("");
    const router = useRouter();

    useEffect(() => {
        if(debug){
            console.log("useEffect is running, and retrieve token");
        }
        const token = localStorage.getItem("token");
        if(debug){
            console.log("Retrieved token",token);
        }

        if(!token){
            console.log("Token not found and redirecting to login page.");
            //When the user does not have a token, it returns login page.
            router.push("/login");
        }

        try{
            //Check the exising token is valid or not.
            const decodedToken = jwt.decode(token);
            if(debug){
                console.log("Verify retrieved token",token);
                console.log("Decoded token",decodedToken);
            }

            //FIXME figure out need to jwt.verify needs on frontend
            // const decoded = jwt.verify(token, secret_key);
            // if(debug){
            //     console.log("Decoded token",decoded);
            // }

            //Store use email address
            if(debug){
                console.log("email in the decodedToken",decodedToken.email);
            }
            setLoginUser(decodedToken.email);

        }catch(err){
            console.log("Token verification failed.");
            console.log("Error name: ", err.name);
            console.log("Error message: ", err.message);
            console.log("Error stack: ", err.stack);
            router.push("/user/login");
        }


    }, [router]);

    //loginUser holds user email address to proceed modify and delete item.
    return loginUser;
}

export default useAuth;