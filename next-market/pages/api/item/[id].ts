import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/database";
import {ItemModel} from "../../../utils/schemaModels";
import {ResReadSingleType, SavedItemDataType} from "../../../utils/types";


const getSingleItem = async(req: NextApiRequest, res: NextApiResponse<ResReadSingleType>) => {
    try {
        await connectDB();
        //Fetch specific item row with id
        const singleItem: SavedItemDataType | null = await ItemModel.findById(req.query.id);
        console.log("Success to read an item.");
        if(!singleItem){
            return res.status(400).json({message:"Failed to read an item. No such item."});
        }
        return res.status(200).json({message: "Success to read an item.", singleItem:singleItem});
    }catch(err) {
        return res.status(400).json({message:"Failed to read an item."});
    }
}

export default getSingleItem