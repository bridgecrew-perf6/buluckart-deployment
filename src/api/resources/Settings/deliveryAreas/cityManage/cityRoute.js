import express from 'express';
import  cityCtrl from './cityCtrl';
import { sanitize } from '../../../../../middleware/sanitizer';



export const cityRouter = express.Router();   

cityRouter.route('/add').post(sanitize(),cityCtrl.addCityManageSetting);

cityRouter.route('/getall').get(sanitize(), cityCtrl.getCityManageSettingall);
cityRouter.route('/getby').get(sanitize(), cityCtrl.getCityManageSetting);
cityRouter.route('/delete').delete(sanitize(), cityCtrl.deleteCityManageSetting);
cityRouter.route('/update').post(sanitize(), cityCtrl.updateCityManageSetting);

//global city api
cityRouter.route('/globlecity').get(sanitize(), cityCtrl.getallCityglobel);
cityRouter.route('/countryList').get(sanitize(), cityCtrl.getallCountaryglobel);
cityRouter.route('/citylistbyname').get(sanitize(), cityCtrl.getallCityByFilter);















