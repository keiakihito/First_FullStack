import Image from "next/image";


const debug = false;


const DeleteItem = (props) =>{

    const handleSubmit = async(e)=>{
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
    return(
        <div>
            <h1>Delete the item</h1>
            <form onSubmit={handleSubmit}>
                <h2>{props.singleItem.title}</h2>
                    <Image src={props.singleItem.image} width={750} height={500} alt={"item-image"}/>
                    <h3>¥{props.singleItem.price}</h3>
                    <p>{props.singleItem.description}</p>
                <button>Delete</button>
            </form>

        </div>
    )

}

export default DeleteItem;

export const getServerSideProps = async(context) => {
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