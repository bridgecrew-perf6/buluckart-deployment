import express from 'express';
import favCtrl from './favCtrl';
import { sanitize } from '../../../middleware/sanitizer';
// import { validateBody, schemas } from '../../../middleware/validator';

export const custFavListRouter = express.Router();
custFavListRouter.route('/create').post(sanitize(), favCtrl.create);
custFavListRouter.route('/list').get(sanitize(), favCtrl.getCustFavList);
custFavListRouter.route('/getbyId').get(sanitize(), favCtrl.getCustFavListbyCustId);
custFavListRouter.route('/updatebyid').post(sanitize(), favCtrl.updateIteam);
custFavListRouter.route('/removebyid').delete(sanitize(), favCtrl.removeFav);
custFavListRouter.route('/multipleremove').delete(sanitize(), favCtrl.removemultipleItem);









