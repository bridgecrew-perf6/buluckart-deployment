import express from 'express';
import  deliveryCtrl from './deliveryCtrl';
import { sanitize } from '../../../../middleware/sanitizer';



export const deliveryRouter = express.Router();   

deliveryRouter.route('/add').post(sanitize(),deliveryCtrl.adddeliveryAreasSettings);

deliveryRouter.route('/getall').get(sanitize(), deliveryCtrl.getdeliveryAreasSettingsall);
deliveryRouter.route('/getby/:id').get(sanitize(), deliveryCtrl.getdeliveryAreasSettings);
deliveryRouter.route('/delete').delete(sanitize(), deliveryCtrl.deletedeliveryAreasSettings);
deliveryRouter.route('/update').post(sanitize(), deliveryCtrl.updatedeliveryAreasSettings);
















