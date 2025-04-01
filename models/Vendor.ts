import mongoose,{Schema,Document,Model} from 'mongoose';

interface VendorDoc extends Document{
    name:string;
    ownerName:string;
    foodType:[string];
    pincode:string;
    address:string;
    phone:string;
    email:string;
    password:string;
    salt:string;
    serviceAvailable:boolean;
    coverImages:[string];
    rating:number;
    food:any;
}
const VendorSchema = new Schema<VendorDoc>({
    name:{type:String,required:true},
    ownerName:{type:String,required:true},
    foodType:{type:[String]},
    pincode:{type:String,required:true},
    address:{type:String},
    phone:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    salt:{type:String,required:true},
    serviceAvailable:{type:Boolean,default:false},
    coverImages:{type:[String]},
    rating:{type:Number,default:0},
    //food:[{
       // type:mongoose.SchemaTypes.ObjectId,
        //ref:'food'
    //}]
},{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            delete ret.salt;
        }   

    },
    timestamps:true
})

const Vendor = mongoose.model<VendorDoc>('vendor',VendorSchema)
export {Vendor}