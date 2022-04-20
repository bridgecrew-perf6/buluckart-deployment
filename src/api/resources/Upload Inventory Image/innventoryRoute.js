import inventoryPhotoCtrl from "./inventoryPhotoCtrl";
import upload from '../../../awsavtar'
import { sanitize } from "../../../middleware/sanitizer";
import express from "express"

export const inventoryRouter = express.Router();
inventoryRouter.route('/add').post(upload.single('photo'), inventoryPhotoCtrl.addInventoryPhoto);
inventoryRouter.route('/getall').get(sanitize(),inventoryPhotoCtrl.getinventoryall);
inventoryRouter.route('/getby/:id').get(sanitize(),inventoryPhotoCtrl.getinventory);
inventoryRouter.route('/delete').delete(sanitize(),inventoryPhotoCtrl.deleteinventory);
inventoryRouter.route('/update/:id').put(sanitize(),inventoryPhotoCtrl.updateinventory);
