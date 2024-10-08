import type {NextPage, GetServerSideProps} from "next";
import Image from "next/image";
import useAuth from "../../../utils/useAuth";
import Head from "next/head";
import {ReadSingleDataType} from "../../../utils/types";
import {useState} from "react";

const debug = false;


const DeleteItem: NextPage<ReadSingleDataType>= (props) =>{
    const [title, setTitle] = useState<string>(props.singleItem.title);
    const [price, setPrice] = useState<string>(props.singleItem.price);
    const [image, setImage] = useState<string>(props.singleItem.image);
    const [description, setDescription] = useState<string>(props.singleItem.description);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:3000/api/item/delete/${props.singleItem._id}`, {
                method: "POST",
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const jsonData = await response.json();

            if(debug){
                console.log(jsonData);
            }
            if(response.ok){
                alert("Succeed to delete the item.");
            }else{
                alert("Failed to delete the item.");
            }


        }catch(err){
            alert("Fail to delete the item.");
        }
    }

    const loginUser = useAuth();

    //Check login user's email address matches  item id(email address).
    if(loginUser === props.singleItem.email){
        return(
            <div className="delete-page">
                <Head><title>Delete the item</title></Head>
                <h1>Delete the item</h1>
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
        return <h1>No authorization to delete it.</h1>
    } // end of if


}

export default DeleteItem;

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
