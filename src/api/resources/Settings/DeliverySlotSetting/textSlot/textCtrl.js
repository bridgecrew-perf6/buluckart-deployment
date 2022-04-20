import { db } from '../../../../../models';

export default {

    /* Add user api start here................................*/

    async adddeliveryTextSlotSettings(req, res, next) {
        console.log(req.body)
        try {
            const { timeSlotfrom, timeSlotTo, Day} = req.body
            const deliveryTextSlotSettingsDetails = await db.deliveryTextSlotSettings.create({
                 timeSlotfrom:timeSlotfrom,
                 timeSlotTo:timeSlotTo,
                 Day:Day
            });
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: deliveryTextSlotSettingsDetails
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
async getdeliveryTextSlotSettings(req, res) {
    try {
        const deliveryTextSlotSettingsDetails = await db.deliveryTextSlotSettings.findOne({ where: { id: req.params.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: deliveryTextSlotSettingsDetails
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
    async getdeliveryTextSlotSettingsall(req, res){
        try {
            // const ItemDetails = await productModel.findAll();
        const ItemDetails = await db.deliveryTextSlotSettings.findAll()
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
    async updatedeliveryTextSlotSettings(req, res){
        try {
            const { timeSlotfrom, timeSlotTo, Day} = req.body
            const updatedeliveryTextSlotSettings =await db.deliveryTextSlotSettings.update({
                 timeSlotfrom:timeSlotfrom,
                 timeSlotTo:timeSlotTo,
                 Day:Day
        },
        {where: {id: req.params.id} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            deliveryTextSlotSettings: updatedeliveryTextSlotSettings,
            
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
    async deletedeliveryTextSlotSettings(req, res){
        try {
            const deliveryTextSlotSettingsDetails =  await db.deliveryTextSlotSettings.destroy({
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