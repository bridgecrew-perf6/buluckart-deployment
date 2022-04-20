import express from 'express';
import  referCtrl from './referCtrl';
import { sanitize } from '../../../../middleware/sanitizer';


export const referRouter = express.Router();   

referRouter.route('/add').post(sanitize(), referCtrl.addreferEarnModel);

referRouter.route('/getall').get(sanitize(), referCtrl.getreferall);
referRouter.route('/getby/:id').get(sanitize(), referCtrl.getrefer);
referRouter.route('/delete/:id').delete(sanitize(), referCtrl.deleterefer);
referRouter.route('/update/:id').put(sanitize(), referCtrl.updaterefer);
















