import express from 'express';
import  pickupCtrl from './pickupCtrl';
import { sanitize } from '../../../../../middleware/sanitizer';



export const pickupRouter = express.Router();   

pickupRouter.route('/add').post(sanitize(),pickupCtrl.addpickupAreasSettings);
pickupRouter.route('/getall').get(sanitize(), pickupCtrl.getpickupAreasSettingsall);
pickupRouter.route('/getby').get(sanitize(), pickupCtrl.getpickupAreasSettings);
pickupRouter.route('/delete').delete(sanitize(), pickupCtrl.deletepickupAreasSettings);
pickupRouter.route('/update').post(sanitize(), pickupCtrl.updatepickupAreasSettings);
















