import {useState} from "react";
import useAuth from "../../utils/useAuth";
import Head from "next/head";

const debug = false;

const CreateItem = () =>{
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");



    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch("https://first-full-stack-git-main-kkatsumis-projects.vercel.app/api/item/create", {
                method: "POST",
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description
                })
            });
            const jsonData = await response.json();
            if(debug){
                console.log(jsonData);
            }
            alert("Succeed to create a new item.");

        }catch(err){
            alert("Fail to create a new item.");
        }
    }

    const loginUser = useAuth();
    if(debug){
        console.log("loginUser email address in create.js", loginUser);
    }

    if(loginUser){
        return(
            <div>
                <Head><title>Create a new item</title></Head>
                <h1 className = "page-title">Create a new item</h1>
                <form onSubmit={handleSubmit}>
                    <input value ={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Item Name" required/>
                    <input value ={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="price" required/>
                    <input value = {image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="item image" required/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="Item description" required/>
                    <button>Submit</button>
                </form>

            </div>
        );
    } // end of if

}

export default CreateItem;