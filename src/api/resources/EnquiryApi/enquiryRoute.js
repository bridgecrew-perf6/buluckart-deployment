import express from 'express';
import  enquiryCtrl from './enquiryCtrl';
import { sanitize } from '../../../middleware/sanitizer';


export const enquiryRoute = express.Router();   

enquiryRoute.route('/add').post(sanitize(), enquiryCtrl.addenquiryModel);

enquiryRoute.route('/getall').get(sanitize(), enquiryCtrl.getenquiryModelall);
enquiryRoute.route('/getby/:id').get(sanitize(), enquiryCtrl.getenquiryModel);
enquiryRoute.route('/delete/:id').delete(sanitize(), enquiryCtrl.deleteenquiryModel);
enquiryRoute.route('/update/:id').put(sanitize(), enquiryCtrl.getenquiryModelall);
















