import { db } from '../../../../../models';

export default {

    /* Add user api start here................................*/

    async adddeliverySlotSettings(req, res, next) {
        console.log(req.body)
        try {
            const { OrderBuffertime,InstanceDelivery, testSlotId,OrderTimeTaken, MaxOrder,appDisplayMsg} = req.body
            const deliverySlotSettingsDetails = await db.deliverySlotSettings.create({
                 OrderBuffertime:OrderBuffertime,
                 testSlotId:testSlotId,
                 OrderTimeTaken:OrderTimeTaken,
                 MaxOrder:MaxOrder,
                 appDisplayMsg:appDisplayMsg,
                 InstanceDelivery:InstanceDelivery
            });
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: deliverySlotSettingsDetails
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
async getdeliverySlotSettings(req, res) {
    try {
        const deliverySlotSettingsDetails = await db.deliverySlotSettings.findOne({ where: { id: req.params.id } ,
           include: [{ model: db.deliveryTextSlotSettings}]});
    
               
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: deliverySlotSettingsDetails
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
    async getdeliverySlotSettingsall(req, res){
        try {
        // const ItemDetails = await productModel.findAll();
        const ItemDetails = await db.deliverySlotSettings.findAll({
                include: [{ model: db.deliveryTextSlotSettings}]
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
    async updatedeliverySlotSettings(req, res){
        try {
            const { OrderBuffertime, InstanceDelivery,testSlotId,OrderTimeTaken, MaxOrder,appDisplayMsg} = req.body
            const updatedeliverySlotSettings =await db.deliverySlotSettings.update({
                  OrderBuffertime:OrderBuffertime,
                 testSlotId:testSlotId,
                 OrderTimeTaken:OrderTimeTaken,
                 MaxOrder:MaxOrder,
                 appDisplayMsg:appDisplayMsg,
                 InstanceDelivery:InstanceDelivery
        },
        {where: {id: req.params.id} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            deliverySlotSettings: updatedeliverySlotSettings,
            
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
    async deletedeliverySlotSettings(req, res){
        try {
            const deliverySlotSettingsDetails =  await db.deliverySlotSettings.destroy({
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
    }

}