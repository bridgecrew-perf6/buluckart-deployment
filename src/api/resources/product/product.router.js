import express from 'express';
import productController from './product.controller';
import { sanitize } from '../../../middleware/sanitizer';
import { jwtStrategy } from '../../../middleware/strategy';
import upload from '../../../awsbucket';



export const productRouter = express.Router();
productRouter.route('/add').post(sanitize(), upload.array('file', 10),productController.addProduct);
// productRouter.route('/add').post(sanitize(),productController.addProduct);
productRouter.route('/getAllproduct').get(sanitize(), productController.index);
productRouter.route('/getAllproductList').get(sanitize(), productController.getAllProductList);
productRouter.route('/update').post(sanitize(),upload.array('file', 10), productController.update);
productRouter.route('/getProductByCategory').get(sanitize(), productController.getProductListByCategory);
productRouter.route('/getProductById').get(sanitize(), productController.getProductListById);
productRouter.route('/getWebProductById').get(sanitize(), productController.getWebProductListById);
productRouter.route('/product-offer').post(sanitize(), productController.addProductOffer);
productRouter.route('/getAllProductOffer').get(sanitize(), productController.getProductOffer);
productRouter.route('/delete').delete(sanitize(), productController.productDelete);
productRouter.route('/deleteOfferById/:id').get(sanitize(), productController.productOfferDelete);
productRouter.route('/upload-img').post(sanitize(), upload.array('file', 10), productController.multiplePhotoUpload);
productRouter.route('/getAllPhoto').get(sanitize(), productController.getAllPhoto);
productRouter.route('/slider-photo/delete/:id').delete(sanitize(), productController.deleteSliderPhoto);
productRouter.route('/multydelete').post(sanitize(), productController.productMultyDelete);

//Category by product
productRouter.route('/getAllGroceryStaple').get(sanitize(), productController.getAllGrocerryStaples);
productRouter.route('/getAllByCategory').post(sanitize(), productController.GetAllByCategory);



// Filter product
productRouter.route('/gcatalogsearch/result').get(sanitize(), productController.getFilterbyProduct);

//new api
productRouter.route('/search_product').post( productController.searchProductBySubCat);


//aws image delete
productRouter.route('/aws/delete/photo').post(sanitize(), productController.awsProductPhotoDelete);
//status
productRouter.route('/status').post(sanitize(), productController.updatestatus);
productRouter.route('/multiactive').post(sanitize(), productController.updatemultiplestatus);
productRouter.route('/sortindex').post(sanitize(),productController.updateIndex);
//varient delete
productRouter.route('/varientList').get(sanitize(),productController.getAllvarientlist)
productRouter.route('/vrientdelete').post(sanitize(), productController.deletevarient);
productRouter.route('/vrientUpdate').post(sanitize(), productController.updatevarient);











