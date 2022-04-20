import config from './config';
import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3'

  
AWS.config.update({
    accessKeyId: process.env.AWSACCESSKEY1,
    secretAccessKey:process.env.AWSSECRETKEY1,
    region: process.env.AWSREGION1
})

const s3 = new AWS.S3();
const fileFilter = (req, file, cb) => {
    console.log(file)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
}

var upload = multer({
    
    storage: multerS3({
        fileFilter,
        s3: s3,
        bucket:process.env.AWSBUCKET1,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'photoUrl' });
        },
        key: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
})

module.exports = upload;


