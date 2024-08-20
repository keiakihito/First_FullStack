import connectDB from "../../../utils/database"
import {ItemModel} from "../../../utils/schemaModels"
import auth from "../../../utils/auth"

const createItem = async(req, res) => {
    try{
        //Connect to DB
        await connectDB();

        //ItemModel.create() writes data to the database.
        //Update DB schema. if it fails, it goes to catch scope.
        await ItemModel.create(req.body);
        console.log("Success: Item created in MongoDB");

        return res.status(200).json({message:"Create a new item."});
    }catch(err){
        console.error("Fail: Item was not created in MongoDB", err);
        return res.status(400).json({message:"Failed to create a new item."});
    }


}

export default auth(createItem);


