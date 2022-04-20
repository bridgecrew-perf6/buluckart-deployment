 import  uploadProductExcelCtrl from"../bulkCtrl/uploadProductExcelCtrl";
 import  express  from "express"
 import upload from"../../../../awsImportExport";

 export const excelUploadRouter = express.Router()
 
 excelUploadRouter.post("/upload", upload.single("file"), uploadProductExcelCtrl.uploadexcell);
 excelUploadRouter.get("/tutorials", uploadProductExcelCtrl.getProduct);
 