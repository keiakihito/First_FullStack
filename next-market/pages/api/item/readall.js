import connectDB from '../../../utils/database';
import {ItemModel} from "../../../utils/schemaModels"

const getAllItems =async(req, res) => {
    try{
        await connectDB();
        const allItems = await ItemModel.find();
        console.log("Success: getAllItems");
        return res.status(200).json({message: "Success to get all Items", allItems: allItems});
    }catch(err){
        console.log("Failed to get all items");
        return res.status(400).json({message:"Failed to get all items"});
    }

}

export default getAllItems;