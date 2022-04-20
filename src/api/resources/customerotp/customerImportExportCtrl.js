import readXlsxFile from "read-excel-file/node";
import { Sequelize }  from"sequelize"
import { db } from '../../../models';
const  Op = Sequelize.Op



 async function addCustomerExcel(req,res){
    try {
      console.log(req.file)
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    let path = __basedir + "/public/excelUploads/" + req.file.filename;
    readXlsxFile(path).then((rows) => {
        //  res.send(rows)
        // console.log(rows)
     // skip header
      rows.shift();
       let customer=[];
       let oldadress1=[];
       let oldadress2=[];
       let oldadress3=[];
       let adress1=[];
       let adress2=[];
       let adress3=[];
       let adress4=[];
       

     rows.forEach((row) => {
       
    
      let customers = {
    
            id: row[0],
            Name: row[1],
            avatar:row[2],
            phone: row[3],
            email:row[4],
            totalOrder: row[5],
            loyalityPoints:row[6],
            status: row[7],
            plateForm:row[8],
            enrollNo:row[9],
              
        };
         customer.push(customers);

        //  let oldAdress= {
        //    custId:row[0],
        //    adresss:row[10]
        //  }
        //  oldadress1.push(oldAdress);

        //    let oldAdress2= {
        //    custId:row[0],
        //    adresss:row[11]
        //  }
        //  oldadress2.push(oldAdress2);


        //    let oldAdress3= {
        //    custId:row[0],
        //    adresss:row[12]
        //  }
        //  oldadress3.push(oldAdress3);
        //  console.log(oldadress1);
        //  console.log(oldAdress2)
        //  console.log(oldAdress3)

        let mapadresses1={
            custId: row[0],
            addressType : row[13],
            Hno: row[14],
            street: row[15],
            locality:row[16],
            area: row[17],
            district: row[18],
            state :row[19],
            pincode : row[20],
            latitude: row[21],
            longitude: row[22]
        }
        adress1.push(mapadresses1);


         let mapadresses2={
            custId: row[0],
            addressType : row[23],
            Hno: row[24],
            street: row[25],
            locality:row[26],
            area: row[27],
            district: row[28],
            state :row[29],
            pincode : row[30],
            latitude: row[31],
            longitude: row[32]
        }
        adress2.push(mapadresses2);

            let mapadresses3={
            custId: row[0],
            addressType : row[33],
            Hno: row[34],
            street: row[35],
            locality:row[36],
            area: row[37],
            district: row[38],
            state :row[39],
            pincode : row[40],
            latitude: row[41],
            longitude: row[42]
        }
        adress3.push(mapadresses3);

          let mapadresses4={
            custId: row[0],
            addressType : row[43],
            Hno: row[44],
            street: row[45],
            locality:row[46],
            area: row[47],
            district: row[48],
            state  : row[49],
            pincode : row[50],
            latitude: row[51],
            longitude: row[52]
        }
        adress4.push(mapadresses4);
    
      });
      db.customerModel.bulkCreate(customer)
      // db.olderAppAdress.bulkCreate(oldadress1)
      // db.olderAppAdress.bulkCreate(oldadress2)
      // db.olderAppAdress.bulkCreate(oldadress3)
      db.mapcustomeradress.bulkCreate(adress1)
      db.mapcustomeradress.bulkCreate(adress2)
      db.mapcustomeradress.bulkCreate(adress3)
      db.mapcustomeradress.bulkCreate(adress4)
    
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
     addCustomerExcel,


}