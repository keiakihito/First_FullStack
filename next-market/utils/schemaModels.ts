import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface ItemDataType{
    title: string
    image: string
    price: string
    description: string
    email: string
}

interface UserDataType{
    name: string
    email: string
    password: string
}

const ItemSchema = new Schema<ItemDataType>({
    title: String,
    image:String,
    price: String,
    description: String,
    email: String,
})

const UserSchema = new Schema<UserDataType>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})



export const ItemModel = mongoose.models.Item || mongoose.model<ItemDataType>("Item", ItemSchema);
export const UserModel = mongoose.models.User || mongoose.model<UserDataType>("User", UserSchema);
