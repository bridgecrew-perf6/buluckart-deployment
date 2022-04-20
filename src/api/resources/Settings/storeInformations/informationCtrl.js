import { db } from '../../../../models';


export default {

    /* Add user api start here................................*/

    async addstoreInformationSettings(req, res, next) {
     
        try {
            const {StoreName,StoreContactPerson,photoUrl,StoreContactNumber, StoreEmail,Location, City, State,Country,Timezone, Zipcode, Currency, AppShareLink, AndroidShareLink ,  phoneShareLink, ShowCurrency, UploadStoreLogo,ShowUploadAppIcon,AboutUs}= req.body;
            const storeInformationSettingsDetails = await db.storeInformationSettings.create({
              StoreName:StoreName,
              StoreContactPerson:StoreContactPerson,
              StoreContactNumber:StoreContactNumber,
              StoreEmail:StoreEmail,
              Location:Location,
              City:City,
              State:State,
              Country:Country,
              Timezone:Timezone,
              Zipcode:Zipcode,
              Currency:Currency,
              AppShareLink:AppShareLink,
              AndroidShareLink:AndroidShareLink,
              phoneShareLink:phoneShareLink,
              ShowCurrency:ShowCurrency,
              UploadStoreLogo:UploadStoreLogo,
              photoUrl:photoUrl,
              AboutUs:AboutUs
            });
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: storeInformationSettingsDetails
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
async getstoreInformationSettings(req, res) {
    try {
        const storeInformationSettingsDetails = await db.storeInformationSettings.findOne({ where: { id: req.query.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: storeInformationSettingsDetails
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
    async getstoreInformationSettingsall(req, res){
        try {
            // const ItemDetails = await productModel.findAll();
        const ItemDetails = await db.storeInformationSettings.findAll()
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
    async updatestoreInformationSettings(req, res){
        try {
            const {StoreName,StoreContactPerson,photoUrl,infoId,StoreContactNumber, StoreEmail,Location, City, State,Country,Timezone, Zipcode, Currency, AppShareLink, AndroidShareLink ,  phoneShareLink, ShowCurrency, UploadStoreLogo,ShowUploadAppIcon,AboutUs}= req.body;
            const updatestoreInformationSettings = await db.storeInformationSettings.update({
              StoreName:StoreName,
              StoreContactPerson:StoreContactPerson,
              StoreContactNumber:StoreContactNumber,
              StoreEmail:StoreEmail,
              Location:Location,
              City:City,
              State:State,
              Country:Country,
              Timezone:Timezone,
              Zipcode:Zipcode,
              Currency:Currency,
              AppShareLink:AppShareLink,
              AndroidShareLink:AndroidShareLink,
              phoneShareLink:phoneShareLink,
              ShowCurrency:ShowCurrency,
              UploadStoreLogo:UploadStoreLogo,
              photoUrl:photoUrl,
              AboutUs:AboutUs
            },
        {where: {id: infoId} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            storeInformationSettings: updatestoreInformationSettings,
            
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
    async deletestoreInformationSettings(req, res){
        try {
            const storeInformationSettingsDetails =  await db.storeInformationSettings.destroy({
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