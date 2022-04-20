import express from 'express';
import  configCtrl from './configeCtrl';
import { sanitize } from '../../../../middleware/sanitizer';


export const congigueLoyaltyRoute = express.Router();   

congigueLoyaltyRoute.route('/add').post(sanitize(), configCtrl.addLoyaltyPointModel);

congigueLoyaltyRoute.route('/getall').get(sanitize(), configCtrl.getconfigueall);
congigueLoyaltyRoute.route('/getby/:id').get(sanitize(), configCtrl.getconfigue);
congigueLoyaltyRoute.route('/delete/:id').delete(sanitize(), configCtrl.deleteconfigue);
congigueLoyaltyRoute.route('/update/:id').put(sanitize(), configCtrl.updateconfigue);
















