import express from 'express';
import  textCtrl from './textCtrl';
import { sanitize } from '../../../../../middleware/sanitizer';


export const textRoute = express.Router();   

textRoute.route('/add').post(sanitize(), textCtrl.adddeliveryTextSlotSettings);

textRoute.route('/getall').get(sanitize(), textCtrl.getdeliveryTextSlotSettingsall);
textRoute.route('/getby/:id').get(sanitize(), textCtrl.getdeliveryTextSlotSettings);
textRoute.route('/delete/:id').delete(sanitize(), textCtrl.deletedeliveryTextSlotSettings);
textRoute.route('/update/:id').put(sanitize(), textCtrl.updatedeliveryTextSlotSettings);





