import express from 'express';
import locationController from './location.controller';
import { sanitize } from '../../../middleware/sanitizer';
import { jwtStrategy } from '../../../middleware/strategy';
import { validateBody, schemas } from '../../../middleware/validator';

export const locationRouter = express.Router();
// locationRouter.route('/create').post(sanitize(), jwtStrategy, locationController.index);
// locationRouter.route('/list').get(sanitize(),locationController.List);
// locationRouter.route('/delete').delete(sanitize(),jwtStrategy,locationController.getLocationDelete);
// locationRouter.route('/update').post(sanitize(),jwtStrategy,locationController.getLocationUpdate);
locationRouter.route('/create').post(sanitize(),  locationController.index);
locationRouter.route('/list').get(sanitize(),locationController.List);
locationRouter.route('/delete').delete(sanitize(),locationController.getLocationDelete);
locationRouter.route('/update').post(sanitize(),locationController.getLocationUpdate);

//area create
// locationRouter.route('/area/create').post(sanitize(), jwtStrategy,locationController.areaCreate);
// locationRouter.route('/area/list').get(sanitize(),locationController.areaList);
// locationRouter.route('/area/delete').delete(sanitize(),jwtStrategy,locationController.getAreaDeleteById);
// locationRouter.route('/area/update').post(sanitize(),jwtStrategy,locationController.getAreaUpdate);
// locationRouter.route('/area/getAllAreaList').get(sanitize(),locationController.getAreaList);
locationRouter.route('/area/create').post(sanitize(),locationController.areaCreate);
locationRouter.route('/area/list').get(sanitize(),locationController.areaList);
locationRouter.route('/area/delete').delete(sanitize(),locationController.getAreaDeleteById);
locationRouter.route('/area/update').post(sanitize(),locationController.getAreaUpdate);
locationRouter.route('/area/getAllAreaList').get(sanitize(),locationController.getAreaList);

// get location 
locationRouter.route('/area/list/getbyid').get(sanitize(),locationController.getAreaListById);









