import express from 'express';
import  deliverySlotRoute from './deliverySlotCtrl';
import { sanitize } from '../../../../../middleware/sanitizer';


export const deliverySlotRouter = express.Router();   

deliverySlotRouter.route('/add').post(sanitize(), deliverySlotRoute.adddeliverySlotSettings);

deliverySlotRouter.route('/getall').get(sanitize(), deliverySlotRoute.getdeliverySlotSettingsall);
deliverySlotRouter.route('/getby/:id').get(sanitize(), deliverySlotRoute.getdeliverySlotSettings);
deliverySlotRouter.route('/delete/:id').delete(sanitize(), deliverySlotRoute.deletedeliverySlotSettings);
deliverySlotRouter.route('/update/:id').put(sanitize(), deliverySlotRoute.updatedeliverySlotSettings);





