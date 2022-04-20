import { db } from '../../../../models';


export default {

    /* Add user api start here................................*/

    async addfeatureSettings(req, res, next) {
        console.log(req.body)
       
        try {
            const { storeStatus, deliveryArea,numberType,recomendedProduct, deliverySlotStatus, loyaltyProgram, pickUpAdress, delivery, mobileNotrification, emailNotification, smsNotification, COD,socialLogIn, googleAnalyticKey,feacebookPixleKey, googleId,feacebookId, googleAnalyticPixleKey, productTitleHomepage, noOfCategory, reccemendProductNo,emailMandetory, storeLogo, enableRatting,mapEnable, appTitle, homePageTitle, appSubTitle, appHeader, showCOD,displayNumber,ageRistriction,innoviceAmount}= req.body;
            const featureSettingsDetails = await db.featureSettings.create({
               storeStatus:storeStatus,
               deliveryArea:deliveryArea,
               recomendedProduct:recomendedProduct,
               deliverySlotStatus:deliverySlotStatus,
               loyaltyProgram:loyaltyProgram,
               pickUpAdress:pickUpAdress,
               delivery:delivery,
               mobileNotrification:mobileNotrification,
               emailNotification:emailNotification,
               smsNotification:smsNotification,
               COD:COD,
               socialLogIn:socialLogIn,
               googleAnalyticKey:googleAnalyticKey,
               feacebookPixleKey:feacebookPixleKey,
               googleId:googleId,
               feacebookId:feacebookId,
               googleAnalyticPixleKey:googleAnalyticPixleKey,
               productTitleHomepage:productTitleHomepage,
               noOfCategory:noOfCategory,
               reccemendProductNo:reccemendProductNo,
               emailMandetory:emailMandetory,
               storeLogo:storeLogo,
               enableRatting:enableRatting,
               mapEnable:mapEnable,
               appTitle:appTitle,
               homePageTitle:homePageTitle,
               appSubTitle:appSubTitle,
               appHeader:appHeader,
               showCOD:showCOD,
               displayNumber:displayNumber,
               ageRistriction:ageRistriction,
               innoviceAmount:innoviceAmount,
               numberType:numberType
            });
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: featureSettingsDetails
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
async getfeatureSettings(req, res) {
    try {
        const featureSettingsDetails = await db.featureSettings.findOne({ where: { id: req.query.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: featureSettingsDetails
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
    async getfeatureSettingsall(req, res){
        try {
            // const ItemDetails = await productModel.findAll();
        const ItemDetails = await db.featureSettings.findAll()
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
    async updatefeatureSettings(req, res){
        try {
            console.log(req.body)
            const { storeStatus, deliveryArea,numberType,settingId,recomendedProduct, deliverySlotStatus, loyaltyProgram, pickUpAdress, delivery, mobileNotrification, emailNotification, smsNotification, COD,socialLogIn, googleAnalyticKey,feacebookPixleKey, googleId,feacebookId, googleAnalyticPixleKey, productTitleHomepage, noOfCategory, reccemendProductNo,emailMandetory, storeLogo, enableRatting,mapEnable, appTitle, homePageTitle, appSubTitle, appHeader, showCOD,displayNumber,ageRistriction,innoviceAmount}= req.body;
           const updatefeatureSettings =await db.featureSettings.update({
               storeStatus:storeStatus,
               deliveryArea:deliveryArea,
               recomendedProduct:recomendedProduct,
               deliverySlotStatus:deliverySlotStatus,
               loyaltyProgram:loyaltyProgram,
               pickUpAdress:pickUpAdress,
               delivery:delivery,
               mobileNotrification:mobileNotrification,
               emailNotification:emailNotification,
               smsNotification:smsNotification,
               COD:COD,
               socialLogIn:socialLogIn,
               googleAnalyticKey:googleAnalyticKey,
               feacebookPixleKey:feacebookPixleKey,
               googleId:googleId,
               feacebookId:feacebookId,
               googleAnalyticPixleKey:googleAnalyticPixleKey,
               productTitleHomepage:productTitleHomepage,
               noOfCategory:noOfCategory,
               reccemendProductNo:reccemendProductNo,
               emailMandetory:emailMandetory,
               storeLogo:storeLogo,
               enableRatting:enableRatting,
               mapEnable:mapEnable,
               appTitle:appTitle,
               homePageTitle:homePageTitle,
               appSubTitle:appSubTitle,
               appHeader:appHeader,
               showCOD:showCOD,
               displayNumber:displayNumber,
               ageRistriction:ageRistriction,
               innoviceAmount:innoviceAmount,
               numberType:numberType
        },
        {where: {id: settingId} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            featureSettings: updatefeatureSettings,
            
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
    async deletefeatureSettings(req, res){
        try {
            const featureSettingsDetails =  await db.featureSettings.destroy({
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