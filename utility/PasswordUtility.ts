import bcrpyt from 'bcrypt';
import {Request } from 'express';
import jwt from 'jsonwebtoken';
import { VendorPayload } from '../dto/Vendor.dto';
import { APP_SECRET } from '../config';
import { Authpayload } from '../dto/Auth.dto';

export const Generatesalt= async()=>{
    return await bcrpyt.genSalt(10);
}

export const generatePassword = async(password:string,salt:string)=>{
    return await bcrpyt.hash(password,salt);

}

export const validatePassword = async(enteredPassword:string,savedPassword:string,salt:string)=>{
    return await generatePassword(enteredPassword,salt)===savedPassword;
}
export const GenerateSignature = async(payload:VendorPayload)=>{
    return jwt.sign(payload,APP_SECRET,{expiresIn:'1d'});
}

export const ValidateSignature = async(req:Request)=>{
    const signature = req.get('Authorization');
     console.log(signature)
    if(signature){
        const token = signature.split(" ")[1]; // Correct way to extract JWT
console.log(token)
        const payload = jwt.verify(token, APP_SECRET) as Authpayload;
    
        req.user = payload;
        return true;
    }
}