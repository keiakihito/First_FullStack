import type {NextPage, GetStaticProps, GetServerSideProps} from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { ReadAllDataType} from "../utils/types";

const debug = true;

const ReadAllItems: NextPage<ReadAllDataType> = (props) =>{
    //fetch all the data from DB with getServerSideProps
    if(debug){
        console.log("ReadAllItems with getServerSideProps: ", props);
    }
    return (
        <div>
            <Head><title>Next Market</title></Head>
            <div className="grid-container-in">
                {/*map separates each item in the props*/}
                {props.allItems.map(item =>
                    <Link href = {`/item/${item._id}`} key={item._id} className="card">
                            <div key={item._id}>
                                <img src={item.image} width={750} height={500} alt="item-image"/>
                                <div className={"texts-area"}>
                                    <h2>¥{item.price}</h2>
                                    <h3>{item.title}</h3>
                                    <p>{item.description.substring(0, 80)}...</p>
                                </div>
                            </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default ReadAllItems;

//Next.js feature to fetch all the data in DB
//Pass to ReadAllItems function above through props
export const getServerSideProps: GetServerSideProps<ReadAllDataType> = async() => {
    const response = await fetch("http://localhost:3000/api/item/readall"); // method: "GET" is default
    const allItems = await response.json();
    return {
        props: allItems
    }
};