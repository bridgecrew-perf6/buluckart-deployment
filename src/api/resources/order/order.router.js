import express from 'express';
import orderController from './order.controller';
import { jwtStrategy } from '../../../middleware/strategy';
import { sanitize } from '../../../middleware/sanitizer';
// import { validateBody, schemas } from '../../../middleware/validator';

export const orderRouter = express.Router();
orderRouter.route('/create').post(sanitize(),orderController.index);
orderRouter.route('/list').get(sanitize(),orderController.getAllOrderList);
orderRouter.route('/status/update').post(sanitize(),orderController.statusUpdate);
orderRouter.route('/list').post(sanitize(),orderController.getAllOrderListById);
orderRouter.route('/status').post(sanitize(),orderController.getAllOrderStatus);
orderRouter.route('/runnerorder').post(sanitize(),orderController.getrunnerorder);
orderRouter.route('/runnerstatus').post(sanitize(),orderController.runnerUpdate);
orderRouter.route('/count').get(sanitize(),orderController.getAllOrderCount);

//report route
orderRouter.route('/soldreport').get(sanitize(),orderController.getAllSoldList)
orderRouter.route('/dailysoldreport').get(sanitize(),orderController.getdailyList)

//fcm
orderRouter.route('/fcm').post(sanitize(),orderController.fcmNotification)

















