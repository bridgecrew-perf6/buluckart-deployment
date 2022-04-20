import { db } from '../../../../models';


export default {

    /* Add user api start here................................*/

    async adddeliveryAreasSettings(req, res, next) {
        console.log(req.body)
       
        try {
            const {   Zone, DeliveryAreaName, MinimumOrderAmount, ShippingFee,allowcustomers,ChargeShipping, AdditionalNote}= req.body;
            const deliveryAreasSettingsDetails = await db.deliveryAreasSettings.create({
                Zone:Zone, 
                DeliveryAreaName:DeliveryAreaName,
                MinimumOrderAmount:MinimumOrderAmount,
                ShippingFee:ShippingFee,
                allowcustomers:allowcustomers,
                ChargeShipping:ChargeShipping,
                AdditionalNote:AdditionalNote
            });
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: deliveryAreasSettingsDetails
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
async getdeliveryAreasSettings(req, res) {
    try {
        const deliveryAreasSettingsDetails = await db.deliveryAreasSettings.findOne({ where: { id: req.params.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: deliveryAreasSettingsDetails
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
    async getdeliveryAreasSettingsall(req, res){
         let limit = 10;
        let sort = ['createdAt', 'DESC'];
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
            if(req.query.sort == 'name'){
                sort = ['name'];
            }
        }
        try {
            // const ItemDetails = await productModel.findAll();
        const ItemDetails = await db.deliveryAreasSettings.findAll({ order: [['createdAt', 'DESC']]})
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
    async updatedeliveryAreasSettings(req, res){
        try {
            const {   Zone, DeliveryAreaName,areaId, MinimumOrderAmount, ShippingFee,allowcustomers,ChargeShipping, AdditionalNote}= req.body;
            const updatedeliveryAreasSettings =await db.deliveryAreasSettings.update({
                Zone:Zone, 
                DeliveryAreaName:DeliveryAreaName,
                MinimumOrderAmount:MinimumOrderAmount,
                ShippingFee:ShippingFee,
                allowcustomers:allowcustomers,
                ChargeShipping:ChargeShipping,
                AdditionalNote:AdditionalNote
        },
        {where: {id: areaId} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            deliveryAreasSettings: updatedeliveryAreasSettings,
            
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
    async deletedeliveryAreasSettings(req, res){
        try {
            const deliveryAreasSettingsDetails =  await db.deliveryAreasSettings.destroy({
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