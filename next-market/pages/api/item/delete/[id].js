import connectDB from "../../../../utils/database";
import {ItemModel} from "../../../../utils/schemaModels";
import auth from "../../../../utils/auth";

const deleteItem = async(req, res) => {
    try{
        await connectDB();
        const singleItem = await ItemModel.findById(req.query.id);
        if(sinleItem.email === req.body.email){
            await ItemModel.deleteOne({ _id: req.query.id} );
            return res.status(200).json({message:"success to delete item."});
        }else{
            throw new Error()
        }
    }catch(err){
        return res.status(400).json({message:"Failed to delete item."});
    }
}

export default auth(deleteItem);