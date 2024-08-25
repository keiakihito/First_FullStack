import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../../utils/database';
import {ItemModel} from '../../../../utils/schemaModels';
import auth from '../../../../utils/auth';
import {ExtendedNextApiRequestItem, SavedItemDataType, ResMessageType} from "../../../../utils/types";

const debug:boolean = true;

const updateItem =async(req: ExtendedNextApiRequestItem, res: NextApiResponse<ResMessageType>) => {
    console.log(req);
    try{
        await connectDB();
        const singleItem: SavedItemDataType | null = await ItemModel.findById(req.query.id);
        if(!singleItem){
            return res.status(400).json({message: "Item not found, and cannot be modified."});
        }

        if(singleItem.email === req.body.email){
            if(debug){
                console.log("Emails match, proceeding to update item:", req.query.id);
            }
            //Check the user update the same user information
            //When the user email in token and email in the item match, the update happens.
            //Store email information in req.body.email

            //Specify the item in the DB, and overwrite current status to update.
            //_id is a key to find item in the DB
            const updateResult = await ItemModel.updateOne({_id:req.query.id}, req.body);
            if(debug){
                console.log("Update result:", updateResult);
            }
            console.log("Success to modify item");
            return res.status(200).json({message: "Success to modify item"});
        }else{
            if(debug){
                console.error("Email mismatch - cannot update item");
            }
            throw new Error("Error occured.");;
        }
    }catch(err){
        return res.status(400).json({message: "Failed to modify item"})
    }
}

export default auth(updateItem);