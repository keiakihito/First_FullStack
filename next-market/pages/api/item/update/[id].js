import connectDB from '../../../../utils/database';
import {ItemModel} from '../../../../utils/schemaModels';
import auth from '../../../../utils/auth';

const updateItem =async(req, res) => {
    console.log(req);
    try{
        await connectDB();
        const singleItem = await ItemModel.findById(req.query.id);
        if(singleItem.email === req.body.email){
            //Check the user update the same user information
            //When the user email in token and email in the item match, the update happens.
            //Store email information in req.body.email

            //Specify the item in the DB, and overwrite current status to update.
            //_id is a key to find item in the DB
            await ItemModel.updateOne({_id:req.query.id}, req.body);
            console.log("Success to modify item");
            return res.status(200).json({message: "Success to modify item"});
        }else{
            throw new Error("Error occured.");;
        }
    }catch(err){
        return res.status(400).json({message: "Failed to modify item"})
    }
}

export default auth(updateItem);