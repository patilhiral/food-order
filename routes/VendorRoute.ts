import express,{Request,Response,NextFunction} from 'express';
import { GetVendorProfile, UpdateVendorProfile, UpdateVendorService, VendorLogin } from '../controllers/VendorController';
import { Authenticate } from '../middlewares/CommonAuth';
const router = express.Router();

router.post('/login',VendorLogin)
router.get('/profile',Authenticate,GetVendorProfile)
router.patch('/profile',UpdateVendorProfile)
router.patch('/service',UpdateVendorService);

export {router as VendorRoute}