import { db } from '../../../models';
var Sequelize = require("sequelize");

const Op = Sequelize.Op;
const TODAY_START = new Date().setHours(0, 0, 0, 0);
const NOW = new Date();

export default {

    /* Add user api start here................................*/

    async create(req, res, next) {
        try {
            console.log(req.body)
            const { custId, productId, varientId, productName, productPrice, productMrp, qty, productDiscount, grandTotal, productDescription } = req.body;
            await db.customerCart.findOne({ where: { custId: custId, productId: productId, varientId: varientId } }).then(product => {
                if (product != null) {
                    db.customerFavList.update({
                        qty: product.qty + qty
                    }, { where: { custId: custId, productId: productId, varientId: varientId } }
                    ).then((success) => {
                        res.status(200).json({ 'success': true });
                    })
                } else if (product == null) {
                    db.customerFavList.create({
                        custId: custId,
                        productId: productId,
                        varientId: varientId,
                        productName: productName,
                        productPrice: productPrice,
                        productMrp: productMrp,
                        qty: qty,
                        productDiscount: productDiscount,
                        grandTotal: grandTotal,
                        productDescription: productDescription

                    }).then((success) => {
                        res.status(200).json({ 'success': true });
                    })
                        .catch(function (err) {
                            console.log(err)
                            res.status(500).json({ 'errors': ['Error adding to cart'] });
                        });
                }
            })
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async getCustFavList(req, res, next) {
        let limit = 10;
        let sort = ['createdAt', 'DESC'];
        let offset = 0;
        let page = 1;
        if (req.query.limit != undefined) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.page != undefined) {
            page = req.query.page;
            if (page < 1)
                page = 1;
        }
        if (req.query.sort) {
            if (req.query.sort == 'name') {
                sort = ['name'];
            }
        }
        try {
            db.customerFavList.findAll({
                order: [['createdAt', 'DESC']],
                include: [{
                    model: db.product, include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }, { model: db.varientModel, attributes: ["id", "sort", "sku", "waightunitno", "unit", "mrp", "discount", "price", "stock", "minstock", "outofstock"] },
                    { model: db.tagModel, attributes: ["id", "name"] },
                    { model: db.reccomendProduct, attributes: ["id", "productName", "productId"] },
                    { model: db.category, attributes: ["id", "name", "photo"] }, { model: db.SubCategory, attributes: ["id", "sub_name", "photo"] }]
                }],
            })

                .then(list => {
                    res.status(200).json({ 'success': true, order: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },




    async getCustFavListbyCustId(req, res, next) {
        let limit = 10;
        let sort = ['createdAt', 'DESC'];
        let offset = 0;
        let page = 1;
        if (req.query.limit != undefined) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.page != undefined) {
            page = req.query.page;
            if (page < 1)
                page = 1;
        }
        if (req.query.sort) {
            if (req.query.sort == 'name') {
                sort = ['name'];
            }
        }
        try {
            db.customerFavList.findAll({
                where: { custId: req.query.custId },
                order: [['createdAt', 'DESC']],
                include: [{
                    model: db.product, include: [{ model: db.productphoto, attributes: ["id", "imgUrl"] }, { model: db.varientModel, attributes: ["id", "sort", "sku", "waightunitno", "unit", "mrp", "discount", "price", "stock", "minstock", "outofstock"] },
                    { model: db.tagModel, attributes: ["id", "name"] },
                    { model: db.reccomendProduct, attributes: ["id", "productName", "productId"] },
                    { model: db.category, attributes: ["id", "name", "photo"] }, { model: db.SubCategory, attributes: ["id", "sub_name", "photo"] }]
                }],
            })

                .then(list => {
                    res.status(200).json({ 'success': true, order: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },
    //itemupdate
    async updateIteam(req, res, next) {
        try {
            console.log(req.body)
            const { custId, productId, varientId, productName, productPrice, productMrp, qty, productDiscount, grandTotal, productDescription } = req.body;

            await db.customerFavList.update({
                custId: custId,
                productId: productId,
                varientId: varientId,
                productName: productName,
                productPrice: productPrice,
                productMrp: productMrp,
                qty: qty,
                productDiscount: productDiscount,
                grandTotal: grandTotal,
                productDescription: productDescription

            }, { where: { id: req.query.id } }).then((success) => {
                res.status(200).json({ 'success': true });
            })
                .catch(function (err) {
                    console.log(err)
                    res.status(500).json({ 'errors': ['Error adding to cart'] });
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async removeFav(req, res, next) {
        try {
            await db.customerFavList.destroy({ where: { id: req.query.id } }).then((success) => {
                res.status(200).json({ 'success': true });
            }).catch(function (err) {
                console.log(err)
                res.status(500).json({ 'errors': ['somethingWent wrong'] });
            });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    async removemultipleItem(req, res, next) {
        try {
            const removemultipleItem = req.body.removemultipleItem
            console.log(removemultipleItem)
            for (let i = 0; i < removemultipleItem.length; i++) {
                db.customerFavList.destroy({ where: { id: removemultipleItem[i] } })
                    .then((success) => {
                        res.status(200).json({ 'success': true })
                    }).catch(function (err) {
                        console.log(err)
                        res.status(500).json({ 'errors': ['somethingWent wrong'] });
                    });
            }
        }
        catch (err) {
            throw new RequestError('Error');
        }
    }
}