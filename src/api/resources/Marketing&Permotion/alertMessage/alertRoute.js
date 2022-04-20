import express from 'express';
import  alertRoute from './alertCtrl';
import { sanitize } from '../../../../middleware/sanitizer';


export const alertRouter = express.Router();   

alertRouter.route('/add').post(sanitize(), alertRoute.addalertMsgModel);

alertRouter.route('/getall').get(sanitize(), alertRoute.getalertall);
alertRouter.route('/getby/:id').get(sanitize(), alertRoute.getalert);
alertRouter.route('/delete').delete(sanitize(), alertRoute.deletealert);
alertRouter.route('/update/:id').put(sanitize(), alertRoute.updatealert);
















