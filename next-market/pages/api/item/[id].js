import connectDB from "../../../utils/database";
import {ItemModel} from "../../../utils/schemaModels";

const getSingleItem = async(req, res) => {
    try {
        await connectDB();
        //Fetch specific item row with id
        const singleItem = await ItemModel.findById(req.query.id);
        console.log("Success to read an item.");
        return res.status(200).json({message: "Success to read an item.", singleItem:singleItem});
    }catch(err) {
        return res.status(400).json({message:"Failed to read an item."});
    }
}

export default getSingleItem