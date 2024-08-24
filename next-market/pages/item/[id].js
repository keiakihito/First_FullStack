import Image from "next/image";

const debug = true;


const ReadSingleItem = (props) =>{
    console.log("props in ReadSingleItem: ",props);
    return (
        <div>
            <div>
                <Image src = {props.singleItem.image} width={750} height={500} alt="item-image"/>
            </div>
            <div>
                <h1>{props.singleItem.title}</h1>
                <h2>¥{props.singleItem.price}</h2>
                <hr/>
                <p>{props.singleItem.description}</p>
            </div>
        </div>
    )
}

export default ReadSingleItem

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