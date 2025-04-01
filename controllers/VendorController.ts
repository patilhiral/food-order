import {Request,Response,NextFunction} from 'express';
import { VendorLoginInputs } from '../dto/Vendor.dto';
import { FindVendor } from './AdminController';
import { GenerateSignature, validatePassword } from '../utility/PasswordUtility';

export const VendorLogin = async(req:Request,res:Response,next:NextFunction)=>{
    const {email,password} =<VendorLoginInputs>req.body;
    const existingVendor = await FindVendor('',email);

    if(existingVendor){
      const validation = await validatePassword(password,existingVendor.password,existingVendor.salt);
      if(validation){
        const signature = await GenerateSignature({
            _id: existingVendor?._id as string, 
            email:existingVendor.email,
            foodType:existingVendor.foodType,
            name:existingVendor.name
        });
        res.status(200).json({message:"Login Successfull",vendor:signature});
      }
    }
    res.status(200).json({message:"Login not Successfull"});
}

export const GetVendorProfile = async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
 const user =req.user;
 console.log(user)
 if(user){
    const existingVendor = await FindVendor(user._id);
     res.json(existingVendor);
     return;
 }
 res.status(200).json({message:"User not found"})
}

export const UpdateVendorProfile = async(req:Request,res:Response,next:NextFunction)=>{ 
}
export const UpdateVendorService = async(req:Request,res:Response,next:NextFunction)=>{
    
}