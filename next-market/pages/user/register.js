import {useState} from "react"

const Register = () =>{

    //React pass data through state
    //This is a place to save name from user input
    //"" can hold a placeholder such as "Keita"
    //setName can modify value in the name as a setter
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault(); // It prevents reload when user input data.
        try {
            //Sending user data from input to api/user/register.js
            //It requests backend to create a new user, which means method is POST.
            //Need to check the sending data to backend is success or not.
            const response = await fetch("https://first-full-stack-three.vercel.app//api/user/register", {
                method: "POST",
                headers: {
                    //Sending data with json format
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    //JSON.stringfy convert user data with JSON when it sends to backend
                    //Store user input here
                    name: name,
                    email: email,
                    password: password
                })
            })
            //Need to check sending data to backend is success or not.
            //Response from backend should be in the jsonData
            const jsonData = await response.json();
            alert(jsonData.message);
        }catch(err){
            alert("Fail to user registration");
        }
    }

    return(
        <div>
            <header>
                Header
            </header>
            <h1 className="page-title">User Registration</h1>
            <form onSubmit={handleSubmit}>
                {/*When the user input the name, e holds the value */}
                {/*e is passed to setName to store value to name. e.target.value specifies name in the e*/}
                {/*Then name from user input is store to value by setName*/}
                <input value = {name} onChange = {(e) => setName(e.target.value)} type="text" name="name" placeholder="Name" required/>
                <input value = {email} onChange = {(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Email Address" required/>
                <input value = {password} onChange = {(e) => setPassword(e.target.value)} type="text" name="password" placeholder="Password" required/>
                <button>Submit</button>
            </form>
            <footer>
                footer
            </footer>
        </div>
    )
}

export default Register;