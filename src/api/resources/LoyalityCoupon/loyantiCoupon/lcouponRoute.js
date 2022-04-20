import express from 'express';
import  lcouponCtrl from './lcouponCtrl';
import { sanitize } from '../../../../middleware/sanitizer';


export const lcouponRoute = express.Router();   

lcouponRoute.route('/add').post(sanitize(), lcouponCtrl.addLoyaltyPointCouponModel);

lcouponRoute.route('/getall').get(sanitize(), lcouponCtrl.getcouponall);
lcouponRoute.route('/getby/:id').get(sanitize(), lcouponCtrl.getcoupon);
lcouponRoute.route('/delete/:id').delete(sanitize(), lcouponCtrl.updatecoupon);
lcouponRoute.route('/update/:id').put(sanitize(), lcouponCtrl.updatecoupon);
















