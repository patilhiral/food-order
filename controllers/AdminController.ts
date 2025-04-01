
import {Request,Response,NextFunction} from 'express';
import { CreateVendorInput } from '../dto/Vendor.dto';
import { Vendor } from '../models';
import { generatePassword, Generatesalt } from '../utility/PasswordUtility';
export const FindVendor = async(id:string | undefined,email?:string)=>{
    if(email){
        return await Vendor.findOne({email:email});
    }else{
        return await Vendor.findById(id);
    }

}

export const CreateVendor = async(req:Request,res:Response,next:NextFunction):  Promise<void>=>{
 const {name,foodType,address,pincode,email,password,ownerName,phone} = <CreateVendorInput>req.body
 const existingVendor = await  FindVendor(email);
 if(existingVendor){
     res.status(400).json({message:"Vendor already exists"})
     return;
 }

    if(!name || !foodType || !address || !pincode || !email || !password || !ownerName || !phone){
        res.status(400).json({message:"Please fill all the fields"})
        return;
    }

    const salt = await Generatesalt();
    const userPassword = await generatePassword(password,salt);
 const CreateVendor = await Vendor.create({
    name: name,
    address:address,
foodType:foodType,
pincode:pincode,
email:email,
password:userPassword,
ownerName:ownerName,
salt:salt,
phone:phone,
rating:0,
serviceAvailable:false,
coverImages:[]
 })
 res.status(201).json({message:"Vendor Created",data:CreateVendor})
}

export const GetVendor = async(req:Request,res:Response,next:NextFunction)=>{
    const vendors = await Vendor.find();
    if(!vendors){
        res.status(404).json({message:"No Vendors Found"})
        return;
    }
    res.status(200).json({message:"Vendors Found",data:vendors})
}
export const GetVendorById = async(req:Request,res:Response,next:NextFunction)=>{
    let vendorId = req.params.id;
    if(!vendorId){
        res.status(400).json({message:"Vendor ID is required"})
        return;
    }
    const vendor = await FindVendor(vendorId);
    if(!vendor){
        res.status(404).json({message:"vendor not found"})
        return;
    }

    res.status(200).json({message:"Vendor Found",data:vendor})
}