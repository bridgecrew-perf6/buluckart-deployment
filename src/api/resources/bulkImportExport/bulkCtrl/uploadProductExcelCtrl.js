import {db} from"../../../../models";
import readXlsxFile from "read-excel-file/node";
const Product = db.product

export default {
     uploadexcell :async (req, res) => {
  try {
      console.log(req.file)
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    let path =
      __basedir + "/public/excelUploads/" + req.file.filename;
    readXlsxFile(path).then((rows) => {
        // res.send(rows)
     // skip header
      rows.shift();
      let product = [];
      let varients_1 =[];
      let varients_2 =[];
      let varients_3 =[];
      let varients_4 =[];
      let varients_5 =[];
      let tegs_1 =[];
      let tegs_2=[];
      let tegs_3=[];
      let tegs_4=[];
      let tegs_5=[];
     
     
      rows.forEach((row) => {
        //10
        let products = {
            name: row[0],
            description: row[1],
            photo:row[2],
            lableType:row[3],
            GSTrate:row[4],
            isTex:row[5],
            GSTtyp:row[6],
            HSNcode:row[7],
            videoUpload:row[8],
            categoryId:row[9],
            subCategoryId:row[10],
                
        };
         product.push(products);
     
         let   varients1={
            sort:row[11],
            sku: row[12],
            waightunitno: row[13],
            productId:row[14],
            unit:row[15],
            mrp: row[16],
            discount: row[17],
            price: row[18],
            stock:row[19],
            minstock: row[20],
            outofstock: row[21]
          }
          varients_2.push(varients1)

           
           let   varients2={
            sort:row[22],
            sku: row[23],
            waightunitno: row[24],
            productId:row[25],
            unit:row[26],
            mrp: row[27],
            discount: row[28],
            price: row[29],
            stock:row[30],
            minstock: row[31],
            outofstock: row[32]
          }
          varients_2.push(varients2)

       
            let   varients3={
            sort:row[33],
            sku: row[34],
            waightunitno: row[35],
            productId:row[36],
            unit:row[37],
            mrp: row[38],
            discount: row[39],
            price: row[40],
            stock:row[41],
            minstock: row[42],
            outofstock: row[43]
          }
          varients_3.push(varients3)


        let   varients4={
            sort:row[44],
            sku: row[45],
            waightunitno: row[46],
            productId:row[47],
            unit:row[48],
            mrp: row[49],
            discount: row[50],
            price: row[51],
            stock:row[52],
            minstock: row[53],
            outofstock: row[54]
          }
          varients_4.push(varients4)

        let   varients5={
            sort:row[55],
            sku: row[56],
            waightunitno: row[57],
            productId:row[58],
            unit:row[59],
            mrp: row[60],
            discount: row[61],
            price: row[62],
            stock:row[63],
            minstock: row[64],
            outofstock: row[65]
          }
          varients_5.push(varients5)

        let tags1 ={
                Name: row[66],
                productId: row[67],
          }
          tegs_1.push(tags1)
        let tags2 ={
                Name: row[68],
                productId: row[69],
          }
          tegs_2.push(tags2)
        let tags3 ={
                Name: row[70],
                productId: row[71],
          }
          tegs_3.push(tags3)
        let tags4 ={
                Name: row[72],
                productId: row[73],
          }
          tegs_4.push(tags4)
        let tags5 ={
                Name: row[74],
                productId: row[75],
          }
          tegs_5.push(tags5)
  
      });
      Product.bulkCreate(product)
      db.varientModel.bulkCreate(varients_1)
      db.varientModel.bulkCreate(varients_2)
      db.varientModel.bulkCreate(varients_3)
      db.varientModel.bulkCreate(varients_4)
      db.varientModel.bulkCreate(varients_5)
      db.tagModel.bulkCreate(tegs_1)
      db.tagModel.bulkCreate(tegs_2)
      db.tagModel.bulkCreate(tegs_3)
      db.tagModel.bulkCreate(tegs_4)
      db.tagModel.bulkCreate(tegs_5)
      .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
},
  getProduct: (req, res) => {
  Product.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving product.",
      });
    });
 }

}