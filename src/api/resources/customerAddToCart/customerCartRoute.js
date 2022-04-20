import express from 'express';
import customerCartCtrl from './customerCartCtrl';
import { sanitize } from '../../../middleware/sanitizer';
// import { validateBody, schemas } from '../../../middleware/validator';

export const custCartRouter = express.Router();
custCartRouter.route('/create').post(sanitize(), customerCartCtrl.create);
custCartRouter.route('/cartlist').get(sanitize(), customerCartCtrl.getCustCartList);
custCartRouter.route('/getbyId').get(sanitize(), customerCartCtrl.getCustCartListbyCustId);
custCartRouter.route('/updatebyId').post(sanitize(), customerCartCtrl.updateIteamtByCustId);
custCartRouter.route('/removebyId').delete(sanitize(), customerCartCtrl.removeByCustId);
custCartRouter.route('/multipleremove').delete(sanitize(), customerCartCtrl.removemultipleItemByCustId);









