import express from 'express';
import imgCtrl from './imgCtrl';
import { sanitize } from '../../../middleware/sanitizer';
import upload from '../../../awsbucket';


export const imgRouter = express.Router();
imgRouter.route('/add').post(sanitize(),upload.single('photo'), imgCtrl.addsinglImage);
imgRouter.route('/getall').get(sanitize(), imgCtrl.getimgall);
imgRouter.route('/getby/:id').get(sanitize(), imgCtrl.getimg);
imgRouter.route('/delete/:id').delete(sanitize(), imgCtrl.deleteimg);
imgRouter.route('/awsphoto').post(sanitize(),imgCtrl.awsProductPhotoDelete)
imgRouter.route('/update/:id').put(sanitize(), imgCtrl.updateimg);


