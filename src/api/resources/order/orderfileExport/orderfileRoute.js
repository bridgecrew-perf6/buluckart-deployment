 import  orderfilectrl from"./orderfilectrl";
 import  express  from "express"
 import upload from"../../../../awsImportExport";

 export const orderFileImportExportRoute = express.Router()
 
 orderFileImportExportRoute.post("/importorder", upload.single("file"), orderfilectrl.addorderExcel);
