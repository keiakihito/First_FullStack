// import Image from "next/image";
import type { NextPage, GetServerSideProps } from "next";
import {useState} from "react";
import useAuth from "../../../utils/useAuth";
import Head from "next/head";
import {ReadSingleDataType} from "../../../utils/types";

const debug = false;


const UpdateItem: NextPage<ReadSingleDataType> = (props) =>{
    const [title, setTitle] = useState<string>(props.singleItem.title);
    const [price, setPrice] = useState<string>(props.singleItem.price);
    const [image, setImage] = useState<string>(props.singleItem.image);
    const [description, setDescription] = useState<string>(props.singleItem.description);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:3000/api/item/update/${props.singleItem._id}`, {
                method: "PUT",
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                    email: props.singleItem.email
                })
            });
            const jsonData = await response.json();

            if(debug){
                console.log(jsonData);
            }
            if(response.ok){
                alert("Succeed to edit the item.");
            }else{
                alert("Failed to edit the item.");
            }


        }catch(err){
            alert("Fail to edit the item.");
        }
    }

    const loginUser = useAuth();

    //Check login user's email address matches  item id(email address).
    if(loginUser === props.singleItem.email){
        return(
            <div>
                <Head><title>Edit the item</title></Head>
                <h1 className = "page-title">Edit the item</h1>
                <form onSubmit={handleSubmit}>
                    <input value ={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Item Name" required/>
                    <input value ={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="price" required/>
                    <input value = {image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="item image" required/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="Item description" required/>
                    <button>Edit</button>
                </form>
            </div>
        );
    }else{
        //User cannot update different user's item.
        return <h1>No authorization to update it.</h1>
    }


}

export default UpdateItem;

export const getServerSideProps: GetServerSideProps<ReadSingleDataType> = async(context) => {
    //${context.query.id} fetches the item id and concat url to navigate intended item page
    const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`);
    const singleItem = await response.json();
    if(debug){
        console.log("context information: ", context);
    }
    return{
        //Pass singleItem to props
        props: singleItem
    }
}