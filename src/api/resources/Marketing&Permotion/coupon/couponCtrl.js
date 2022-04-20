import { db } from '../../../../models';


export default {

    /* Add user api start here................................*/

    async addcouponModel(req, res, next) {
        console.log(req.body)
        try {
            const { offerName, couponcode, message, active, hideAction, discountupto, coupontype, discount,minOrderAmount, useslimit,dateFrome, dateTo,paymentMethode,orderFacilitie}= req.body;
            const couponDetails = await db.couponModel.create({
                offerName:offerName,
                couponcode:couponcode,
                discountupto:discountupto,
                coupontype:coupontype,
                discount:discount,
                minOrderAmount:minOrderAmount,
                useslimit:useslimit,
                dateFrome:dateFrome,
                dateTo:dateTo,
                paymentMethode:paymentMethode,
                orderFacilitie:orderFacilitie,
                message:message, 
                active:active? active : true,
                hideAction:hideAction ? hideAction :false

            });
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: couponDetails
            });
        }
        catch (error) {
            return res.status(400).send({
                message: 'Unable to insert data',
                errors: error,
                status: 400
            });
        }
    },


   // get single  by id
async getcoupon(req, res) {
    try {
        const couponDetails = await db.couponModel.findOne({ where: { id: req.params.id } ,   include: [{ model: db.Order }]});
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: couponDetails
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
    async getcouponall(req, res){
        try {
            // const ItemDetails = await productModel.findAll();
        const ItemDetails = await db.couponModel.findAll({
               include: [{ model: db.Order }],
        })
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
    async updatecoupon(req, res){
        try {
               const { offerName, couponcode,couponId, message, active, hideAction, discountupto, coupontype, discount,minOrderAmount, useslimit,dateFrome, dateTo,paymentMethode,orderFacilitie}= req.body;
            const updatecoupon =await db.couponModel.update({
                offerName:offerName,
                couponcode:couponcode,
                discountupto:discountupto,
                coupontype:coupontype,
                discount:discount,
                minOrderAmount:minOrderAmount,
                useslimit:useslimit,
                dateFrome:dateFrome,
                dateTo:dateTo,
                paymentMethode:paymentMethode,
                orderFacilitie:orderFacilitie,
                message:message, 
                active:active? active : "true",
                hideAction:hideAction ? hideAction :"false"

        },
        {where: {id: couponId} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            coupon: updatecoupon,
            
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
    async deletecoupon(req, res){
        try {
            const couponDetails =  await db.couponModel.destroy({
            where: {id: req.query.id}
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
    }

}