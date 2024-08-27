import type{NextPage, GetServerSideProps} from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import {ReadSingleDataType} from "../../utils/types"

const debug = true;


const ReadSingleItem: NextPage<ReadSingleDataType> = (props) =>{
    console.log("props in ReadSingleItem: ",props);
    return (
        <div className={"grid-container-si"}>
            <Head><title>{props.singleItem.image}</title></Head>
            <div>
                <Image src = {props.singleItem.image} width={750} height={500} alt="item-image"/>
            </div>
            <div>
                <h1>{props.singleItem.title}</h1>
                <h2>¥{props.singleItem.price}</h2>
                <hr/>
                <p>{props.singleItem.description}</p>
                <div>
                    <Link href={`/item/update/${props.singleItem._id}`}>Edit the item</Link>
                    <Link href={`/item/delete/${props.singleItem._id}`}>Delete the item</Link>
                </div>
            </div>
        </div>
    )
}

export default ReadSingleItem

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