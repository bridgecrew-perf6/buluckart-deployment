import express from 'express';
import  couponCtrl from './couponCtrl';
import { sanitize } from '../../../../middleware/sanitizer';


export const CouponRouter = express.Router();   

CouponRouter.route('/add').post(sanitize(), couponCtrl.addcouponModel);

CouponRouter.route('/getall').get(sanitize(), couponCtrl.getcouponall);
CouponRouter.route('/getby/:id').get(sanitize(), couponCtrl.getcoupon);
CouponRouter.route('/delete').delete(sanitize(), couponCtrl.deletecoupon);
CouponRouter.route('/update').post(sanitize(), couponCtrl.updatecoupon);
















