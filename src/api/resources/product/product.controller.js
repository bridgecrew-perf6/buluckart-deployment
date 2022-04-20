import { db } from '../../../models';
const { Op } = require("sequelize");
import { queue } from '../../../kue';
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
            if (error) {
                console.log(error, error.stock)
            }
            return data
        });
    } catch (error) {
        assert.isNotOk(error, 'Promise error');
        done();
    }
})

export default {

/* Add user api start here................................*/

     async addProduct(req, res, next) {
        try {
            console.log(req.body)
            const { name, description, photo, tags, lableType,reccomendedProduct, isTex,GSTrate,GSTtyp, HSNcode, categoryId, subCategoryId,  videoUpload,} = req.body;
            var varientDetails =  (typeof req.body.varientDetails == "string" ? JSON.parse(req.body.varientDetails) :req.body.varientDetails) ||  (typeof req.body.varientDetails == "object" ? req.body.varientDetails : JSON.parse(req.body.varientDetails));
            console.log(varientDetails)
            db.product.findOne({
                where: { name: name }
               }).then(product => {
                    if (!product) {
                        return db.product.create({
                            name:name,
                            description:description,
                            lableType:lableType,
                            isTex:isTex,
                            // photo:req.file ? req.file.location:'',
                            photo:photo,
                            GSTrate:GSTrate,
                            GSTtyp:GSTtyp,
                            HSNcode:HSNcode,
                            categoryId:categoryId,
                            subCategoryId:subCategoryId,
                            videoUpload:videoUpload,
                            settingId:1
                      }).then(products =>{
                             if(varientDetails) {
                                // logic to save url in db
                                for (let i=0; i < varientDetails.length; i++) {
                                       db.varientModel.create({
                                        productId:products.id,
                                        sort:varientDetails[i].sort,
                                        sku: varientDetails[i].sku,
                                        waightunitno:varientDetails[i].waightunitno,
                                        unit:varientDetails[i].unit,
                                        mrp:varientDetails[i].mrp,
                                        discount: varientDetails[i].discount,
                                        price: varientDetails[i].price,
                                        stock: varientDetails[i].stock,
                                        minstock: varientDetails[i].minstock,
                                        outofstock: varientDetails[i].outofstock
                                    })
                                }
                            } 
                            if(tags) {
                               // logic to save url in db
                                for (let i=0; i < tags.length; i++) {
                                    db.tagModel.create({
                                        productId:products.id,
                                        Name:tags[i]
                                    })
                                }
                             }
                             if(req.files){
                                   let attachmentEntries = [];
                                    for (var i = 0; i < req.files.length; i++) {
                                        attachmentEntries.push({
                                            productId: products.id,
                                            name: req.files[i].filename,
                                            mime: req.files[i].mimetype,
                                            imgUrl: req.files[i].location,
                                        })
                                    }
                                    db.product.findOne({
                                        where: { id: products.id },
                                    }).then(r => {
                                        if (r) {
                                            return queue.create('img-upload', {
                                                productId: products.id,
                                                productName: r.item_name,
                                                attachmentEntries: attachmentEntries,
                                            }).save();
                                        }
                                    })
                                }
                                 if(reccomendedProduct) {
                                // logic to save url in db
                                for (let i=0; i < reccomendedProduct.length; i++) {
                                       db.reccomendProduct.create({
                                        productId:products.id,
                                        productName:reccomendedProduct[i].productName,
                                        reccomendedId:reccomendedProduct[i].reccomendedId
                                        
                                    })
                                }
                            } 
                          })
                    }
                     throw new RequestError('Already exist product', 409);
                }).then((success) => {
                    res.status(200).json({ 'success': true });
                })
                .catch(function (err) {
                    console.log(error);
                    res.status(500).json({ 'errors': ['Error Add Products'] });
                });
            }
        catch (err) {
            console.log(err+"checking") 
            throw new RequestError('Error');
            
        }
    },


    async index(req, res, next) {
        try {
            const { supplierId, categoryId, subCategoryId } = req.query
            db.product.findAll({
                order: [['createdAt', 'DESC']],
                where: { supplierId: supplierId, categoryId: categoryId, subCategoryId: subCategoryId }
               }).then(product => {
                    res.status(200).json({ 'success': true, product });
                })
                .catch(function (err) {
                    next(err)
                });
            }
            catch (err) {
                throw new RequestError('Error');
            }
        },
         

    async getAllProductList(req, res, next) {
          let limit = 10;
        let sort = ['id'];
        let offset = 0;
        let page = 1;
        if(req.query.limit != undefined){
            limit = parseInt(req.query.limit);
        }
        if(req.query.page != undefined){
            page = req.query.page;
            if(page < 1)
                page = 1;
        }
        if(req.query.sort){
            if(req.query.sort == 'id'){
                sort = ['id'];
            }
        }
        try {
           await db.product.findAll({
                  order: [['id']],
                include: [{model:db.featureSettings,attributes:["recomendedProduct","deliverySlotStatus","loyaltyProgram","COD","showCOD","reccemendProductNo"]},{ model: db.productphoto, attributes: ["id", "imgUrl"] },{ model: db.varientModel, attributes: ["id", "sort","sku","waightunitno","unit","mrp","discount","price","stock","minstock","outofstock"]},
                { model: db.tagModel, attributes: ["id","name"]},
                 { model: db.reccomendProduct, attributes: ["id", "productName","productId"]},
                { model: db.category, attributes: ["id", "name","photo"]},{ model: db.SubCategory, attributes: ["id", "sub_name" ,"photo"] }]
             
            }).then(product => {
                    res.status(200).json({ 'success': true, product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    async updateIndex(req,res,next){
        try{
            const {productId,index} = req.body
            console.log(req.body)
            await db.product.findOne({where: { id: productId }}).then(product =>{
                 if (product) {
                    db.product.update({
                         id: index
                    }, { where: { id: productId } 
                    })
                    //varients
                    db.varientModel.update({
                         productId: index
                    }, { where: { productId: productId } 
                    })
                    //tags
                     db.tagModel.update({
                         productId: index
                    }, { where: { productId: productId } 
                    })
                    //reccomended
                    db.reccomendProduct.update({
                         productId: index
                    }, { where: { productId: productId } 
                    })
                     //productPhoto
                    db.productphoto.update({
                         productId: index
                    }, { where: { productId: productId } 
                    })
                    res.status(200).json({
                        mesage:"status Update Successfully!!!"
                    })
                }else{
                    res.status(400).json({
                        message:"something went wrong!!!"
                    })
                }

            })
            

        }catch(err){
            res.send(err)
            console.log(err)
        }
    },

    async updatestatus(req,res,next){
        try{
            const {status,productId} = req.body
            console.log(req.body)
            await db.product.findOne({where: { id: productId }}).then(product =>{
                 if (product) {
                    db.product.update({
                         status: parseInt(status) ? 'active' : 'inactive',
                    }, { where: { id: productId } 
                    })
                    res.status(200).json({
                        mesage:"status Update Successfully!!!"
                    })
                }else{
                    res.status(400).json({
                        message:"something went wrong!!!"
                    })
                }

            })

        }catch(err){
            res.send(err)
            console.log(err)
        }
    },
    //activeinactitive multiple
     
     async updatemultiplestatus(req,res,next){
        try{
            const {status,productId} = req.body
            console.log(req.body)
             for (let i=0; i < productId.length; i++) {
               
             await db.product.findAll({where: { id: productId[i] }}).then(product =>{
                 if (product) {
                    db.product.update({
                         status: parseInt(status) ? 'active' : 'inactive',
                    }, { where: { id: productId[i]} 
                    })
                    res.status(200).json({
                        mesage:"status Update Successfully!!!"
                    })
                }else{
                    res.status(400).json({
                        message:"something went wrong!!!"
                    })
                }

            })
        }

        }catch(err){
            res.send(err)
            console.log(err)
        }
    },


    async update(req, res, next) {
        try {
            console.log(req.body)
            
            const { name, description, photo, tag, productId ,lableType,reccomendedProduct, isTex,GSTrate,GSTtyp, HSNcode, categoryId, subCategoryId,  videoUpload,} = req.body;
            const varientDetails =  (typeof req.body.varientDetails == "string" ? JSON.parse(req.body.varientDetails) :req.body.varientDetails) ||  (typeof req.body.varientDetails == "object" ? req.body.varientDetails : JSON.parse(req.body.varientDetails));
            db.product.findOne({ where: { id: productId },
                 include:[{ model: db.varientModel, attributes: ["id", "sort","sku","waightunitno","unit","mrp","discount","price","stock","minstock","outofstock"]},  { model: db.tagModel, attributes: ["id","name"]}, { model: db.reccomendProduct, attributes: ["id", "productName","productId"]}]
                           
            }).then(product => {
                if (product) {
                   db.product.update({
                        categoryId: categoryId ? categoryId : product.categoryId,
                        subCategoryId: subCategoryId ? subCategoryId : product.subCategoryId,
                        name:name,
                        description:description,
                        lableType:lableType,
                        isTex:isTex,
                        photo:photo,
                        GSTrate:GSTrate,
                        GSTtyp:GSTtyp,
                        HSNcode:HSNcode,
                        categoryId:categoryId,
                        subCategoryId:subCategoryId,
                        videoUpload:videoUpload }, { where: { id: product.id } 
                    })
                }
                if(varientDetails ) {
                     var alldata =json(product)
                     var idx = alldata.varientModels
                     var id =   idx.map(el => el.id) 
                    console.log(id)
                    db.varientModel.findAll ({ where: { productId:productId }})
                    for (let i=0; i < varientDetails.length; i++) {
                        if(id[i]){
                            db.varientModel.update({
                                productId:productId,
                                sort:varientDetails[i].sort,
                                sku: varientDetails[i].sku,
                                waightunitno:varientDetails[i].waightunitno,
                                unit:varientDetails[i].unit,
                                mrp:varientDetails[i].mrp,
                                discount: varientDetails[i].discount,
                                price: varientDetails[i].price,
                                stock: varientDetails[i].stock,
                                minstock: varientDetails[i].minstock,
                                outofstock: varientDetails[i].outofstock
                                }, { where: { id:id[i]}
                            })
                        }else{
                             db.varientModel.create({
                                productId:productId,
                                sort:varientDetails[i].sort,
                                sku: varientDetails[i].sku,
                                waightunitno:varientDetails[i].waightunitno,
                                unit:varientDetails[i].unit,
                                mrp:varientDetails[i].mrp,
                                discount: varientDetails[i].discount,
                                price: varientDetails[i].price,
                                stock: varientDetails[i].stock,
                                minstock: varientDetails[i].minstock,
                                outofstock: varientDetails[i].outofstock
                            })

                        }
                    }     
                }  
                if(tag) {
                     var alldatatag =json(product)
                     var idxtag = alldatatag.tagModels
                     var idt =   idxtag.map(eele => eele.id) 
                    //  console.log(idt)
                    for (let i=0; i < tag.length; i++) {
                          if(idt[i]){
                          db.tagModel.update({
                            productId:productId,
                            Name:tag[i]
                            }, { where: { id:idt[i] }
                        })
                        }else{
                            db.tagModel.create({
                                productId:productId,
                                Name:tags[i]
                            })

                        }
                       
                     }
                 }  
                if(reccomendedProduct) {
                     var alldatarc =json(product)
                     var idxrc = alldatarc.reccomendProducts
                     var idr =   idxrc.map(dta => dta.id) 
                    //  console.log(idr)
                    for (let i=0; i < reccomendedProduct.length; i++) {
                        if(idr[i]){
                           db.reccomendProduct.update({
                            productId:productId,
                            reccomendedId:reccomendedProduct[i].reccomendedId
                                }, { where: { id:idr[i]}
                            })
                        }else{
                           db.reccomendProduct.create({
                                productId:products.id,
                                productName:reccomendedProduct[i].productName,
                                reccomendedId:reccomendedProduct[i].reccomendedId
                                
                            })

                        }
                      
                    }
               
                }
               
            }).then((p) => {
                res.status(200).json({ 'success': true, msg: 'Updated Successfully' });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
     async productDelete(req, res, next) {
       try{
            const productId = req.query.id
            console.log(req.query.id)
           
            await db.product.findOne({where: { id: productId }}).then(product =>{
                 if (product) {
                    db.product.destroy({ where:{ id: productId } 
                    })
                    //varients
                    db.varientModel.destroy({ where:{ productId: productId }})
                    //tags
                     db.tagModel.destroy({ where: { productId: productId }})
                    //reccomended
                    db.reccomendProduct.destroy({ where: { productId: productId }})
                     //productPhoto
                    db.productphoto.destroy({ where: { productId: productId }})
                    res.status(200).json({
                        mesage:"deleted Successfully!!!"
                    })
                }else{
                    res.status(400).json({
                        message:"something went wrong!!!"
                    })
                }

            })
        

       }catch(err){
           next(err)
       }
    },
     async productMultyDelete(req, res, next) {
       try{
            const productMultyId = req.body.productMultyId
             for (let i=0; i < productMultyId.length; i++) {
                 db.product.findOne({where: { id: productMultyId[i] }}).then(product =>{
                     console.log( productMultyId[i])
                 if (product) {
                    db.product.destroy({ where:{ id: productMultyId[i] } 
                    })
                    //varients
                    db.varientModel.destroy({ where:{ productId: productMultyId[i] }})
                    //tags
                     db.tagModel.destroy({ where: { productId: productMultyId[i] }})
                    //reccomended
                    db.reccomendProduct.destroy({ where: { productId: productMultyId[i] }})
                     //productPhoto
                    db.productphoto.destroy({ where: { productId: productMultyId[i] }})
                    res.status(200).json({
                        mesage:"deleted Successfully!!!"
                    })
                }else{
                    res.status(400).json({
                        message:"something went wrong!!!"
                    })
                }

            })
        
            }
           
        

       }catch(err){
           next(err)
       }
    },
     
    async getProductListByCategory(req, res, next) {
        try {
            db.product.findAll({
                order: [['createdAt', 'DESC']],
                where: { categoryId: req.query.categoryId},
                 include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] },{ model: db.varientModel, attributes: ["id", "sort","sku","waightunitno","unit","mrp","discount","price","stock","minstock","outofstock"]},
                { model: db.tagModel, attributes: ["id","name"]},
                { model: db.reccomendProduct, attributes: ["id", "productName","productId"]},
                { model: db.category, attributes: ["id", "name","photo"],include: [{ model: db.SubCategory, attributes: ["id", "sub_name" ,"photo"] }]}]
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    async getProductListById(req, res, next) {
        try {
            db.product.findAll({
                where: { id: req.query.id },
                include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] },{ model: db.varientModel, attributes: ["id", "sort","sku","waightunitno","unit","mrp","discount","price","stock","minstock","outofstock"]},
                { model: db.tagModel, attributes: ["id","name"]},{ model: db.reccomendProduct, attributes: ["id", "productName","productId"]},
                { model: db.category, attributes: ["id", "name","photo"],include: [{ model: db.SubCategory, attributes: ["id", "sub_name" ,"photo"] }]}]
             })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },



    async getWebProductListById(req, res, next) {
        try {
            db.product.findOne({
                where: { id: req.query.id },
                include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }],
                order: [['createdAt', 'DESC']],
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    async addProductOffer(req, res, next) {
        try {
            const { productId, qty, discount_per, discount_price, total, net_price } = req.body;
            db.ProductOffer.findOne({ where: { id: productId } })
                .then(list => {
                    if (!list) {
                        return db.ProductOffer.create({
                            productId: productId,
                            image: req.file ? req.file.location : '',
                            qty: qty,
                            discount_per: discount_per,
                            discount_price: discount_price,
                            total: total,
                            net_price: net_price
                        })
                    }
                    else {
                        return db.ProductOffer.update({
                            qty: qty,
                            discount_per: discount_per,
                            discount_price: discount_price,
                            total: total,
                            net_price: net_price
                        }, { where: { id: list.id } })
                    }
                })
                .then(p => {
                    res.status(200).json({ 'success': true, msg: "Successfully" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async getProductOffer(req, res, next) {
        try {
            db.ProductOffer.findAll({
                include: [{ model: db.product, attributes: ['id', 'categoryId', 'price', 'item_name', 'description', 'brand'], include: [{ model: db.category, attributes: ["id", "name"] }] }]
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async searchProductBySubCat(req, res, next) {
        console.log(req.body)
        try {
            db.SubCategory.findOne({
                where:{ sub_name: req.body.subCat},
            })
            .then(data=>{
                if(data){
                    return db.product.findAll({
                          where:{ subCategoryId: data.id},
                          include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] },{ model: db.varientModel, attributes: ["id", "sort","sku","waightunitno","unit","mrp","discount","price","stock","minstock","outofstock"]},
                { model: db.tagModel, attributes: ["id","name"]},
                // { model: db.reccomendProduct, attributes: ["id", "name","productId"]},
                { model: db.category, attributes: ["id", "name","photo"],include: [{ model: db.SubCategory, attributes: ["id", "sub_name" ,"photo"] }]}]
                    })
                }
            })
            .then(list=>{
                console.log(JSON.stringify(list))
                res.status(200).json({ 'success': true, data: list });
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    // async productDelete(req, res, next) {
    //     db.product.findOne({ where: { id: parseInt(req.query.id) } })
    //         .then(product => {
    //             if (product) {
    //                 return db.product.destroy({ where: { id: product.id } })
    //             }
    //             throw new RequestError('Product is not found')
    //         })
    //         .then(re => {
    //             return res.status(200).json({ 'status': "deleted Product Seccessfully" });
    //         }).catch(err => {
    //             next(err)
    //         })
    // },

    async productOfferDelete(req, res, next) {
        db.ProductOffer.findOne({ where: { id: parseInt(req.params.id) } })
            .then(product => {
                if (product) {
                    return db.ProductOffer.destroy({ where: { id: product.id } })
                }
                throw new RequestError('Product is not found')
            })
            .then(re => {
                return res.status(200).json({ 'status': "deleted Product Seccessfully" });
            }).catch(err => {
                next(err)
            })
    },

    async multiplePhotoUpload(req, res, next) {
        console.log(req.files)
        let attachmentEntries = [];
        var productId = req.body.productId;
        for (var i = 0; i < req.files.length; i++) {
            attachmentEntries.push({
                productId: productId,
                name: req.files[i].filename,
                mime: req.files[i].mimetype,
                imgUrl: req.files[i].location,
            })
        }

        db.product.findOne({
            where: { id: productId },
        }).then(r => {
            if (r) {
                return queue.create('img-upload', {
                    productId: productId,
                    productName: r.item_name,
                    attachmentEntries: attachmentEntries,
                }).save();
            }
            throw new RequestError('ProductId is not found')
        }).then(r => {
            res.status(200).json({ success: r });
        })
            .catch(function (error) {
                console.log(error);
                res.status(500).json({ 'errors': ['Error insert photo'] });
            });
    },

    async getAllPhoto(req, res, next) {
        try {
            db.product.findAll({
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'name', 'brand'],
                include: [{ model: db.productphoto, attributes: ['id', 'imgUrl'] }]
            })
                .then(data => {
                    res.status(200).json({ 'success': true, data });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    async deleteSliderPhoto(req, res, next) {
        db.productphoto.findOne({ where: { id: parseInt(req.query.id) } })
            .then(product => {
                if (product) {
                    return db.productphoto.destroy({ where: { id: req.query.id } })
                }
                throw new RequestError('Product is not found')
            })
            .then(re => {
                return res.status(200).json({ 'status': "deleted Product Seccessfully" });
            }).catch(err => {
                next(err)
            })
    },
    //All GroceryStample product
    async getAllGrocerryStaples(req, res, next) {
        try {
            db.category.findOne({
                attributes: ["id", "slug"],
                where: { slug: 'grocery-staple' },
                include: [{ model: db.product, order: [['createdAt', 'DESC']], include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }] }],

            })
                .then(product => {
                    res.status(200).json({ 'success': true, data: product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

  
    // filter product

    async getFilterbyProduct(req, res, next) {
        try {
            let search = '%%';
            if (req.query.search) {
                search = '%' + req.query.search + '%';
            }
            db.SubCategory.findAll({
                attributes: ['id', 'sub_name'],
                include: [{ model: db.product, order: [['createdAt', 'DESC']], required: true, where: {
                        [Op.or]: [{ name: { [Op.like]: search }}],
                    }
                }]
            })

                .then(product => {
                    res.status(200).json({ 'success': true, data: product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async GetAllByCategory(req, res, next) {
        try {
            db.SubCategory.findOne({
                where: { sub_name: req.body.name },
                include: [{ model: db.SubChildCategory, include: [{ model: db.product, order: [['createdAt', 'DESC']], include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }] }] }]

            })
                .then(product => {
                    res.status(200).json({ 'success': true, data: product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

     async GetAllrecomendedCategory(req, res, next) {
        try {
            db.category.findOne({
               

                include: [{ model: db.SubCategory, include: [{ model: db.product, order: [['createdAt', 'DESC']], include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }], include: [{ model: db.varientModel,}], include: [{ model: db.tagModel }] }] }]

            })
                .then(product => {
                    res.status(200).json({ 'success': true, data: product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    // aws image delete 
    async awsProductPhotoDelete(req, res, next) {
        try {
            const { id, imgUrl } = req.body;
            deleteFileFromS3(imgUrl)
                .then((data) => {
                    if (!data) {
                        return db.productphoto.destroy({ where: { id: id } })
                    }
                    throw new RequestError('error');
                })
                .then((success) => {
                    res.status(200).json({ 'success': true, msg: "Successflly deleted image from s3 Bucket" });
                })

        }
        catch (err) {
            next(err)
            // res.status(500).json({ 'success':false, msg: err})
        }
    },

    async getProductSubChildCat(req, res, next) {
        try {
            const{ subCategoryId, childCategoryId } = req.body;
            db.product.findAll({
                where: { childCategoryId: childCategoryId, subCategoryId: childCategoryId },
            })
                .then(product => {
                    res.status(200).json({ 'success': true, data: product });
                })
                .catch(function (err) {
                    next(err)
                });

        }
        catch (err) {
            next(err)
        
        }
    },
     async getAllvarientlist(req, res, next) {
        try {
            db.varientModel.findAll({
                where:{outofstock:"Continew selling after out of stock"},
                order: [['createdAt', 'DESC']],
                include: [{ model: db.product ,include:[{ model: db.category, attributes: ["id", "name","photo"]}]}]
            })
                .then(data => {
                    res.status(200).json({ 'success': true, data });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async deletevarient(req,res,next){
        try{
            const {varientId} = req.body
            console.log(varientId)
            db.varientModel.destroy({where:({id:varientId})})
                res.status(200).json({messag:"data  deleted successfull"})
         } catch (err) {
            next(err)
           
        }
    },
     async updatevarient(req, res){
        try {
            const {   sort, sku, unit, mrp, discount,waightunitno, price, stock, minstock,outofstock,varientid}= req.body;
            console.log(req.body)
            const updatebannerSettings =await db.varientModel.update({
                sort:sort,
                sku: sku,
                waightunitno: waightunitno,
                unit:unit,
                mrp:mrp,
                discount:discount,
                price:price,
                stock:stock,
                minstock:minstock,
                outofstock: outofstock
        },
        {where: {id:varientid} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            bannerSettings: updatebannerSettings,
            
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

}


