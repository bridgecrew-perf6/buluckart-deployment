import express from 'express';
import categoryController from './category.controller';
import { jwtStrategy } from '../../../middleware/strategy';
import upload from '../../../awsbucket';
import { sanitize } from '../../../middleware/sanitizer';
import { validateBody, schemas } from '../../../middleware/validator';

export const categoryRouter = express.Router();
// categoryRouter.route('/getAllCategory').get(sanitize(), jwtStrategy, categoryController.getCategoryList);
categoryRouter.route('/getAllSubCategory').get(sanitize(), jwtStrategy, categoryController.getSubCategoryList);



categoryRouter.route('/c/:slug/:id').get(sanitize(),jwtStrategy,categoryController.filterByCategoryList);

//Searching filter category
categoryRouter.route('/catlogsearch/child-category').post(sanitize(),jwtStrategy,categoryController.getFilterbyCategory);
categoryRouter.route('/catlogsearch/product').post(sanitize(),jwtStrategy, categoryController.getProductBySubcategory);

//mobile view
categoryRouter.route('/mobile/getAllCategory').get(sanitize(),categoryController.getAllMobileCategory);






//Updated  category route==========================
categoryRouter.route('/create').post(sanitize() ,upload.single('photo'), categoryController.addCategory);
categoryRouter.route('/updatecategoryonly').post(sanitize(),upload.single('photo'),categoryController.updatecategoryOnly);
categoryRouter.route('/main-list').get(sanitize(),categoryController.getMainList);
categoryRouter.route('/getAllCategory').get(sanitize(), categoryController.getCategoryList);
categoryRouter.route('/rcpcategory').get(sanitize(), categoryController.GetAllrecomendedCategory);
categoryRouter.route('/getCategoryById/:id').get(sanitize(),  categoryController.getCategoryById);
categoryRouter.route('/delete/:id').delete(sanitize(), categoryController.deleteCategory);

//updated sub category Routes
categoryRouter.route('/create-sub').post(sanitize(),upload.single('photo'),categoryController.addSubCategory);
categoryRouter.route('/updatesubcategoryonly').post(sanitize(),upload.single('photo'),categoryController.updateSubCategoryOnly);
categoryRouter.route('/allsublist').get(sanitize(), categoryController.getSubCategory);
categoryRouter.route('/sublistonly').get(sanitize(), categoryController.getSubCategoryListOnly);
categoryRouter.route('/getSubCategoryById/:id').get(sanitize(),  categoryController.getSubCategoryById);
categoryRouter.route('/deleteSub/:id').delete(sanitize(), categoryController.deleteSubCategory);





