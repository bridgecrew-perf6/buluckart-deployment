import express from 'express';
import  faqCtrl from './faqCtrl';
import { sanitize } from '../../../../middleware/sanitizer';



export const faqRouter = express.Router();   

faqRouter.route('/add').post(sanitize(),faqCtrl.addfaqSettings);

faqRouter.route('/getall').get(sanitize(), faqCtrl.getfaqSettingsall);
faqRouter.route('/getby').get(sanitize(), faqCtrl.getfaqSettings);
faqRouter.route('/delete').delete(sanitize(), faqCtrl.deletefaqSettings);
faqRouter.route('/update').post(sanitize(), faqCtrl.updatefaqSettings);
















