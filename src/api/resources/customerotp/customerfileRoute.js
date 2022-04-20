 import  customerImportExportCtrl from"./customerImportExportCtrl";
 import  express  from "express"
 import upload from"../../../awsImportExport";

 export const excelUploadCustomerRouter = express.Router()
 
 excelUploadCustomerRouter.post("/importcustmer", upload.single("file"), customerImportExportCtrl.addCustomerExcel);
