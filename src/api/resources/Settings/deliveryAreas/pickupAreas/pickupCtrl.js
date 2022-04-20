import { db } from '../../../../../models';


export default {

    /* Add user api start here................................*/

    async addpickupAreasSettings(req, res, next) {
        console.log(req.body)
       
        try {
            const {SelectCity,Zone,PickupAddress,PickupPhone,PickupEmail,PickupLat, PickupLng, AutoFill, MinimumOrderAmount, AdditionalNote,allowcustomers}= req.body;
            const pickupAreasSettingsDetails = await db.pickupAreasSettings.create({
               SelectCity:SelectCity,
               Zone:Zone,
               PickupAddress:PickupAddress,
               PickupPhone:PickupPhone,
               PickupEmail:PickupEmail,
               PickupLat:PickupLat,
               PickupLng:PickupLng,
               AutoFill:AutoFill,
               MinimumOrderAmount,
               AdditionalNote:AdditionalNote,
               allowcustomers:allowcustomers
            });
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: pickupAreasSettingsDetails
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
async getpickupAreasSettings(req, res) {
    try {
        const pickupAreasSettingsDetails = await db.pickupAreasSettings.findOne({ where: { id: req.query.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: pickupAreasSettingsDetails
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
    async getpickupAreasSettingsall(req, res){
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
        const ItemDetails = await db.pickupAreasSettings.findAll({ order: [['createdAt', 'DESC']]})
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
    async updatepickupAreasSettings(req, res){
        console.log(req.body)

        try {
            const {SelectCity,Zone,PickupAddress,PickupPhone,pikupid,PickupEmail,PickupLat, PickupLng, AutoFill, MinimumOrderAmount, AdditionalNote,allowcustomers}= req.body;
            const updatepickupAreasSettings =await db.pickupAreasSettings.update({
                    SelectCity:SelectCity,
                    Zone:Zone,
                    PickupAddress:PickupAddress,
                    PickupPhone:PickupPhone,
                    PickupEmail:PickupEmail,
                    PickupLat:PickupLat,
                    PickupLng:PickupLng,
                    AutoFill:AutoFill,
                    MinimumOrderAmount,
                    AdditionalNote:AdditionalNote,
                    allowcustomers:allowcustomers
        },
        {where: {id: pikupid} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            pickupAreasSettings: updatepickupAreasSettings,
            
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
    async deletepickupAreasSettings(req, res){
        try {
            const pickupAreasSettingsDetails =  await db.pickupAreasSettings.destroy({
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