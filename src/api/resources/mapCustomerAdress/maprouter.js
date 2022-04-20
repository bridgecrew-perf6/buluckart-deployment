import express from 'express';
import mapCtrl from './mapCtrl';
import { sanitize } from '../../../middleware/sanitizer';


export const mapAdressRouter = express.Router();

mapAdressRouter.route('/create').post(sanitize(),  mapCtrl.createMapAdress);
mapAdressRouter.route('/getlistByid/:custid').get(sanitize(),  mapCtrl.getlist);
mapAdressRouter.route('/updateByid/:id').post(sanitize(),  mapCtrl.updateadress);
mapAdressRouter.route('/deletemap/:id').delete(sanitize(),  mapCtrl.deleteadress);
