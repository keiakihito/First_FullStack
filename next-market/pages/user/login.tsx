import type {NextPage} from "next";
import {useState} from "react";

const debug = true;


const Login: NextPage = () =>{
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Avoid reload with hitting submit button by user
        if(debug){
            console.log("handleSubmit triggered.");
        }
        try{
            //Send user input to backend
            const response = await fetch("http://localhost:3000/api/user/login", {
                method: "POST",
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            //Check the response from backend
            const jsonData = await response.json();
            //Check receiving token from backend
            if(debug){
                console.log(jsonData);
            }
            //token is set to LocalStorage in the browser to keep certain hours
            //Check Firefox -> Inspection -> Storage -> Local Storage to check the token is set.
            localStorage.setItem("token", jsonData.token);

            alert(jsonData.message);
        }catch(err){
            alert("Fail to user log in.");
        }
    }

    return (
        <div>
            <header>
                header
            </header>
            <h1 className="page-title">Login</h1>
            {/*Accept user input and send it to the backend, then receive response from backend*/}
            {/*user input is store to email and password*/}
            <form onSubmit={handleSubmit}>
                <input value = {email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="text" name="email" placeholder="Email Address" required/>
                <input value = {password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="text" name="password" placeholder="Password" required/>
                <button>Log in</button>
            </form>
            <footer>
                footer
            </footer>
        </div>
    )
}

export default Login