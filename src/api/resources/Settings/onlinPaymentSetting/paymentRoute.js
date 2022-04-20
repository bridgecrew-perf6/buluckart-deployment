import express from 'express';
import  paymentCtrl from './paymentCtrl';
import { sanitize } from '../../../../middleware/sanitizer';



export const paymentSettingRoute = express.Router();   

paymentSettingRoute.route('/add').post(sanitize(), paymentCtrl.addpaymentGatewaySettings);

paymentSettingRoute.route('/getall').get(sanitize(), paymentCtrl.getpaymentGatewaySettingsall);
paymentSettingRoute.route('/getby').get(sanitize(), paymentCtrl.getpaymentGatewaySettings);
paymentSettingRoute.route('/delete/:id').delete(sanitize(), paymentCtrl.deletepaymentGatewaySettings);
paymentSettingRoute.route('/update').post(sanitize(), paymentCtrl.updatepaymentGatewaySettings);
















