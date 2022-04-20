import express from 'express';
import  TaxCtrl from './TaxCtrl';
import { sanitize } from '../../../../middleware/sanitizer';



export const TaxSettingRouter = express.Router();   

TaxSettingRouter.route('/addTax').post(sanitize(), TaxCtrl.addTax);
TaxSettingRouter.route('/getbyid').get(sanitize(),TaxCtrl.getallTaxList)
TaxSettingRouter.route('/update').post(sanitize(),TaxCtrl.update)
TaxSettingRouter.route('/delete').delete(sanitize(),TaxCtrl.deletedata)



