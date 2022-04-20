import express from 'express';
import  informationCtrl from './informationCtrl';
import { sanitize } from '../../../../middleware/sanitizer';
import upload from '../../../../awsavtar'


export const informationRouter = express.Router();   

informationRouter.route('/add').post(sanitize(), informationCtrl.addstoreInformationSettings);

informationRouter.route('/getall').get(sanitize(), informationCtrl.getstoreInformationSettingsall);
informationRouter.route('/getby').get(sanitize(), informationCtrl.getstoreInformationSettings);
informationRouter.route('/delete').delete(sanitize(), informationCtrl.deletestoreInformationSettings);
informationRouter.route('/update').post(sanitize(), informationCtrl.updatestoreInformationSettings);
















