import { db } from '../../../models';
var Sequelize = require("sequelize");
import config from '../../../config';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: config.app.AWS_ACCESS_KEY,
    secretAccessKey: config.app.AWS_SECRET_KEY,
})

var deleteFileFromS3 = (async (imgUrl) => {
    try {
        const lastItem = imgUrl.substring(imgUrl.lastIndexOf('/') + 1)
        
        var params = {
            Bucket: 'buluckartphoto',
            Key: lastItem,
        };
        s3.deleteObject(params, (error, data) => {
            console.log(params)
            if (error) {
                console.log(error, error.stack)
            }
            return data
        });
    } catch (error) {
        assert.isNotOk(error, 'Promise error');
        done();
    }
})

export default {
     async addsinglImage(req,res,next){
        db.singleimagedb.create({
            photo:req.file ? req.file.location : '',
        }) .then(result => {
            res.status(200).send({
                message:"Image upload successfully!!!",
                id: result.id,
                photo : result.photo,
            })
        })
     },
     
// get single  by id
async getimg(req, res) {
    try {
        const tagDetails = await db.singleimagedb.findOne({ where: { id: req.params.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: tagDetails
        });
    }
    catch (error) {
        return res.status(400).send({
            message: 'Unable to fetch data',
            errors: error,
            status: 400
        });
    }
},
async getimgall(req, res){
      try {
        // const ItemDetails = await productModel.findAll();
      const ItemDetails = await db.singleimagedb.findAll()
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: ItemDetails
        });
    
    }
    catch (error) {
        return res.status(400).send({
            message: 'Unable to fetch data',
            errors: error,
            status: 400
        });
    }
},
async updateimg(req, res){
    try {
        const updatetag =await db.singleimagedb.update({
             name:req.body.name,
             description:req.body.description

     },
     {where: {id: req.params.id} });
     return res.status(201).send({
        status: 200,
        message: 'Data update Successfully',
        tag: updatetag,
        
    });
    }
    catch (error) {
        return res.status(400).send({
            message: 'Unable to update data',
            errors: error,

            status: 400
        });
    }
},
 async deleteimg(req, res){
    try {
        const tagDetails =  await db.singleimagedb.destroy({
          where: {id: req.params.id}
         });
         await res.status(200).send({
             message:"delete successfull"
         })
    }
    catch (error) {
        return res.status(400).send({
            message: 'Unable to update data',
            errors: error,
            status: 400
        });
    }
},
async awsProductPhotoDelete(req, res, next) {
        try {
            const {imgUrl } = req.body;
            console.log(imgUrl)
            deleteFileFromS3(imgUrl)
                .then((data) => {
                 
                    if (!data) {
                        return  db.singleimagedb.destroy({ where: { photo: imgUrl } })
                    }
                    throw new RequestError('error');
                })
                .then((success) => {
                    res.status(200).json({ 'success': true, msg: "Successflly deleted image from s3 Bucket" });
                })

        }
        catch (err) {
            next(err)
            res.status(500).json({ 'success':false, msg: err})
        }
    },


}


