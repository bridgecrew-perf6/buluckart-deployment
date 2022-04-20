import express from 'express';
import  pageCtrl from './pageCtrl';
import { sanitize } from '../../../../middleware/sanitizer';



export const pageRouter = express.Router();   

pageRouter.route('/add').post(sanitize(),pageCtrl.addpageSettings);

pageRouter.route('/getall').get(sanitize(), pageCtrl.getpageSettingsall);
pageRouter.route('/getby/:id').get(sanitize(), pageCtrl.getpageSettings);
pageRouter.route('/delete/:id').delete(sanitize(), pageCtrl.deletepageSettings);
pageRouter.route('/update/:id').put(sanitize(), pageCtrl.updatepageSettings);
















