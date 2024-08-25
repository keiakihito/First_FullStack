import type {NextApiRequest, NextApiResponse} from "next";
import connectDB from '../../../utils/database';
import {ItemModel} from "../../../utils/schemaModels"
import {SavedItemDataType, ResReadAllType} from "../../../utils/types";


const getAllItems =async(req: NextApiRequest, res: NextApiResponse<ResReadAllType>) => {
    try{
        await connectDB();
        const allItems: SavedItemDataType[] = await ItemModel.find();
        console.log("Success: getAllItems");
        return res.status(200).json({message: "Success to get all Items", allItems: allItems});
    }catch(err){
        console.log("Failed to get all items in readall.ts");
        return res.status(400).json({message:"Failed to get all items"});
    }

}

export default getAllItems;