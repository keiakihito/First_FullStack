import {useState} from "react";

const debug = false;

const CreateItem = () =>{
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:3000/api/item/create", {
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
    return(
        <div>
            <h1>Create an item</h1>
            <form onSubmit={handleSubmit}>
                <input value ={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Item Name" required/>
                <input value ={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="price" required/>
                <input value = {image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="item image" required/>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="Item description" required/>
                <button>Submit</button>
            </form>

        </div>
    )

}

export default CreateItem;