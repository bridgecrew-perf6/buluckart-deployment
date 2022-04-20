import { db } from '../../../../models';


export default {

    /* Add user api start here................................*/

    async addpaymentGatewaySettings(req, res, next) {
        console.log(req.body)
       
        try {
            const { statusMode, KeyId,SecrietKey, paytamMarchentId,paytamSecrietKey}= req.body;
            const paymentGatewaySettingsDetails = await db.paymentGatewaySettings.create({
               statusMode:statusMode,
               KeyId:KeyId,
               SecrietKey:SecrietKey,
               paytamMarchentId:paytamMarchentId,
               paytamSecrietKey:paytamSecrietKey
            });
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: paymentGatewaySettingsDetails
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
async getpaymentGatewaySettings(req, res) {
    try {
        const paymentGatewaySettingsDetails = await db.paymentGatewaySettings.findOne({ where: { id: req.query.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: paymentGatewaySettingsDetails
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
    async getpaymentGatewaySettingsall(req, res){
        try {
            // const ItemDetails = await productModel.findAll();
        const ItemDetails = await db.paymentGatewaySettings.findAll()
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
    async updatepaymentGatewaySettings(req, res){
        try {
            const { statusMode,razorId, KeyId,SecrietKey, paytamMarchentId,paytamSecrietKey}= req.body;
            console.log(req.body)
            const updatepaymentGatewaySettings =await db.paymentGatewaySettings.update({
               statusMode:statusMode,
               KeyId:KeyId,
               SecrietKey:SecrietKey,
               paytamMarchentId:paytamMarchentId,
               paytamSecrietKey:paytamSecrietKey
        },
        {where: {id: razorId} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            paymentGatewaySettings: updatepaymentGatewaySettings,
            
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
    async deletepaymentGatewaySettings(req, res){
        try {
            const paymentGatewaySettingsDetails =  await db.paymentGatewaySettings.destroy({
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