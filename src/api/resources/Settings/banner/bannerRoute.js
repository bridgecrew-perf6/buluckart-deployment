import express from 'express';
import bannerCtrl from './bannerCtrl';
import { sanitize } from '../../../../middleware/sanitizer';
import upload from '../../../../awsavtar'


export const bannerRouter = express.Router();

bannerRouter.route('/add').post(sanitize(), upload.single('photo'), bannerCtrl.addbannerSettings);

bannerRouter.route('/getall').get(sanitize(), bannerCtrl.getbannerSettingsall);
bannerRouter.route('/getby/:id').get(sanitize(), bannerCtrl.getbannerSettings);
bannerRouter.route('/getByCategory').get(sanitize(), bannerCtrl.getbannerBannerTyp);
bannerRouter.route('/delete').delete(sanitize(), bannerCtrl.deletebannerSettings);
bannerRouter.route('/update').post(sanitize(), upload.single('photo'), bannerCtrl.updatebannerSettings);
















