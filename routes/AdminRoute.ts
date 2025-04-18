import express,{Request,Response,NextFunction} from 'express';
import { CreateVendor, GetVendor, GetVendorById } from '../controllers'

const router = express.Router();
router.post('/vendor',CreateVendor)
router.get('/vendors',GetVendor)
router.get('/vendors/:id',GetVendorById)


export {router as AdminRoute}