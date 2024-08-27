import type {NextApiRequest, NextApiResponse} from "next";
import {Types} from "mongoose";


//schemaModels.ts
export interface ItemDataType{
    title: string;
    image: string;
    price: string;
    description: string;
    email: string;
}

export interface UserDataType{
    name: string;
    email: string;
    password: string;
}


//auth.ts
export interface DecodedType{
    email: string;
}

//Common
export interface ExtendedNextApiRequestAuth extends NextApiRequest {

    headers:{
        authorization:string;
    }

    body:{
        email: string;
    }
}

//Common
export interface ResMessageType{
    message: string;
    token?: string; // It means token is optional
}

//register.ts, login.ts
export interface ExtendedNextApiRequestUser extends NextApiRequest {
    body: UserDataType;
}


//login.ts
// savedUserData in the login.ts means _id + UserDataType.
// It is the data item in the mongoDB.
export interface SavedUserDataType extends UserDataType{
    _id: Types.ObjectId ;// This is unique dataType in the mongoDB
}


//readall.tx, [id].ts, update/[id].ts, delete.ts
export interface SavedItemDataType extends ItemDataType{
    _id: Types.ObjectId;
}

//readall.ts
export interface ResReadAllType{
    message: string;
    allItems?: ItemDataType[];
}

//create.ts
export interface ExtendedNextApiRequestItem extends NextApiResponse {
    query?: any;
    body: ItemDataType;
}


//[id].ts
export interface ResReadSingleType{
    message: string
    singleItem?: SavedItemDataType;
}

//Frontend
//[id].tsx, update/[id].tsx, delete/[id].tsx
export interface ReadSingleDataType{
    singleItem:{
        _id: string
        title: string
        image: string
        price: string
        description: string
        email: string
    }
}

export interface ReadAllDataType{
    allItems:{
        _id:string
        title:string
        image:string
        price:string
        description:string
        email:string
    }[]
}