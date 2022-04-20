import { db } from '../../../models';
var FCM = require('fcm-node');
var serverKey = process.env.SERVER_KEY;
var fcm = new FCM(serverKey);
var Sequelize = require("sequelize");

const Op = Sequelize.Op;
const TODAY_START = new Date().setHours(0, 0, 0, 0);
const NOW = new Date();

export default {

    /* Add user api start here................................*/

    async index(req, res, next) {
        try {
            console.log(req.body)
            const { custId, couponId, paid, orderId, paymentmethod, deliveryAddress, product, deliverydate, shipingCharge, couponAmount, totalDiscount, grandtotal, paymentStatus, WalletRefund, status, runners, runnersStatus } = req.body;
            db.customerModel.findOne({ where: { id: custId } })
                .then(p => {
                    if (p) {
                        return db.Order.create({
                            custId: custId,
                            couponId: couponId,
                            paid: paid,
                            number: orderId,
                            paymentmethod: paymentmethod,
                            deliverydate: deliverydate,
                            deliverydate: deliverydate,
                            shipingCharge: shipingCharge,
                            couponAmount: couponAmount,
                            totalDiscount: totalDiscount,
                            grandtotal: grandtotal,
                            paymentStatus: paymentStatus,
                            WalletRefund: WalletRefund,
                            runners: runners,
                            runnersStatus: runnersStatus,
                            settingId: 1
                        })
                    }

                    return res.status(500).json({ 'errors': ['User is not found'] });
                })
                .then((order) => {
                    if (order) {
                        return db.Address.create({
                            orderId: order.id,
                            custId: custId,
                            mapId: deliveryAddress ? deliveryAddress.mapId : '',
                            fullname: deliveryAddress.fullname ? deliveryAddress.fullname : '',
                            phone: deliveryAddress.phone ? deliveryAddress.phone : '',
                            house: deliveryAddress.house ? deliveryAddress.house : '',
                            landmark: deliveryAddress.landmark ? deliveryAddress.landmark : '',
                            street: deliveryAddress.street ? deliveryAddress.street : '',
                            area: deliveryAddress.area ? deliveryAddress.area : '',
                            city: deliveryAddress.city ? deliveryAddress.city : '',
                            discrict: deliveryAddress.discrict ? deliveryAddress.discrict : '',
                            states: deliveryAddress ? deliveryAddress.states : '',
                            shipping: deliveryAddress ? deliveryAddress.pincode : '',
                            latitude: deliveryAddress.latitude ? deliveryAddress.latitude : '',
                            longitude: deliveryAddress.longitude ? deliveryAddress.longitude : '',
                        }).then((p) => [order, p])
                    }
                    console.log(order)
                })
                .then(([order, p]) => {
                    if (order) {
                        let cartEntries = [];

                        for (var i = 0; i < product.length; i++) {
                            cartEntries.push({
                                orderId: order.id,
                                addressId: p.id,
                                productId: product[i].id,
                                productName: product[i].name,
                                qty: product[i].qty,
                                mrp: product[i].mrp,
                                waightunitno: product[i].waightunitno,
                                unit: product[i].unit,
                                price: product[i].price,
                                total: product[i].total,
                                photo: product[i].photo,
                                varientId: product[i].varientId,
                                discount: product[i].discount,
                                TaxType: product[i].TaxType,
                                GSTrate: product[i].GSTrate,
                                taxAmount: product[i].taxAmount,
                                comments: product[i].comments
                            })
                        }
                        console.log(cartEntries)
                        return db.orderCart.bulkCreate(cartEntries).then((r) => [r])
                    }
                })
                .then((success) => {
                    res.status(200).json({ 'success': true });
                })
                .catch(function (err) {
                    console.log(err)
                    res.status(500).json({ 'errors': ['Error adding cart'] });
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async getAllOrderList(req, res, next) {
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
            db.Order.findAll({
                order: [['createdAt', 'DESC']],
                include: [{ model: db.featureSettings, attributes: ["displayNumber", "numberType", "innoviceAmount", "delivery"] }, { model: db.Address, include: [{ model: db.mapcustomeradress }] }, { model: db.orderCart }],
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

    //soldlist order
    async getAllSoldList(req, res, next) {
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
            db.Order.findAll({
                where: { status: req.query.status },
                order: [['createdAt', 'DESC']],
                include: [{ model: db.orderCart, include: [{ model: db.varientModel }] }],
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

    //dailly orders
    async getdailyList(req, res, next) {
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
            const soldlist = db.Order.findAll({
                where: { status: req.query.status },
                order: [['createdAt', 'DESC']],
                include: [{ model: db.customerModel }, { model: db.orderCart, include: [{ model: db.varientModel }] }],
                attributes: [
                    [Sequelize.literal(`DATE("createdAt")`), 'date'],
                    [Sequelize.literal(`COUNT(*)`), 'count']
                ],
                group: ['date'],
            }).then(list => {


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



    async runnerUpdate(req, res, next) {
        try {
            const { id, runners, runnersStatus, } = req.body;
            console.log(req.body)
            db.Order.findOne({ where: { id: id } })
                .then(list => {
                    return db.Order.update({
                        runners: runners,
                        runnersStatus: runnersStatus,
                    }, { where: { id: id } })
                })
                .then((success) => {
                    res.status(200).json({ 'success': true, msg: "Successfully Updated runners status" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },

    async statusUpdate(req, res, next) {
        try {
            const { id, status, deliverydate } = req.body;
            db.Order.findOne({ where: { id: id } })
                .then(list => {
                    return db.Order.update({
                        status: status,
                        deliverydate: deliverydate ? deliverydate : list.deliverydate
                    }, { where: { id: id } })
                })
                .then((success) => {
                    res.status(200).json({ 'success': true, msg: "Successfully Updated Status" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },

    async getAllOrderListById(req, res, next) {
        try {
            db.Order.findAll({
                where: { custId: req.body.id },
                order: [['createdAt', 'DESC']],
                include: [{ model: db.Address, include: [{ model: db.mapcustomeradress }] }, { model: db.orderCart }]
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
    async getrunnerorder(req, res, next) {
        try {
            db.Order.findAll({
                where: { runners: req.body.runners },
                order: [['createdAt', 'DESC']],
                include: [{ model: db.Address, include: [{ model: db.mapcustomeradress }] }, { model: db.orderCart }]
            }).then(list => {
                res.status(200).json({ 'success': true, order: list })
            }).catch(function (err) {
                next(err)
            });

        } catch (err) {
            res.send(err)
        }
    },
    async getAllOrderStatus(req, res, next) {
        try {
            db.Order.findAll({
                where: { status: req.body.status },
                order: [['createdAt', 'DESC']],
                include: [{ model: db.Address, include: [{ model: db.mapcustomeradress }] }, { model: db.orderCart }]
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
    async getAllOrderCount(req, res, next) {
        try {
            db.Order.findAll({
                attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('status')), 'total']],
                group: ['status']
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }
    },

    //notification
    async fcmNotification(req, res, next) {
        try {
            var message = {
                to: `${process.env.DEVICE_TOKENS}`,
                notification: {
                    title: 'BuluckCart App test  Notification',
                    body: '{"Message from node js app"}',
                },

                data: { //you can send only notification or only data(or include both)
                    title: 'ok cdfsdsdfsd',
                    body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
                }


            };
            fcm.send(message, function (err, response) {
                if (err) {
                    console.log("somthing went wrong" + err)
                } else {
                    res.send("Notification sent successfully")
                    console.log("notification successfully send" + response)
                }
            })

        } catch (err) {
            res.status(500).json({ 'errors': "" + err });
        }

    }
}


