import { Authpayload } from "../dto/Auth.dto";
import {Request,Response,NextFunction} from 'express';
import { ValidateSignature } from "../utility/PasswordUtility";

declare global{
    namespace Express{
        interface Request{
            user?: Authpayload
        }
    }
}

export const Authenticate = async (req:Request,res:Response,next:NextFunction)=>{
    const validate = await ValidateSignature(req);
    if(validate){
        next();
    }else{
        res.status(403).json({message:"Unauthenticated"});
    }
}