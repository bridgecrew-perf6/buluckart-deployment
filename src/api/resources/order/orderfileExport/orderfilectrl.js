import readXlsxFile from "read-excel-file/node";
import { Sequelize }  from"sequelize"
import { db } from '../../../../models';
const  Op = Sequelize.Op



 async function addorderExcel(req,res){
    try {
      console.log(req.file)
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    let path = __basedir + "/public/excelUploads/" + req.file.filename;
    readXlsxFile(path).then((rows) => {
        //  res.send(rows)
        console.log(rows)
     // skip header
      rows.shift();
       let order=[];
       let adress=[];
      
       

     rows.forEach((row) => {
    
      let orders = {
              custId: row[0],
              deliverydate:row[1],
              number: row[3],
              grandtotal: row[4],
              runners: row[5],
              runnersStatus: row[6],
              paymentmethod:row[7],
              status: row[8],
          };
        order.push(orders) 

        
    
      });
      db.Order.bulkCreate(order)
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

 

 
}
  export default  {
     addorderExcel,


}