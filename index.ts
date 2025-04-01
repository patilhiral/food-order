import express from 'express';
import { AdminRoute,VendorRoute } from './routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { MONGO_URI } from './config';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect(MONGO_URI).then(result =>{
    console.log('Connected to MongoDB');
}).catch(err =>{
    console.log(err);
})
app.use('/admin',AdminRoute);
app.use('/vendor',VendorRoute);
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})