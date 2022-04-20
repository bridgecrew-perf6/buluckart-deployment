import { db } from '../../../models';


export default {

    /* Add user api start here................................*/

    async addenquiryModel(req, res, next) {
        console.log(req.body)
        try {
            const {   plateform, name, email,phoneno,Message}= req.body;
            const enquiryModelDetails = await db.enquiryModel.create({
                plateform:plateform,
                name:name,
                email:email,
                phoneno:phoneno,
                Message:Message

            });
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: enquiryModelDetails
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
async getenquiryModel(req, res) {
    try {
        const enquiryModelDetails = await db.enquiryModel.findOne({ where: { id: req.params.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: enquiryModelDetails
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
    async getenquiryModelall(req, res){
        try {
            // const ItemDetails = await productModel.findAll();
        const ItemDetails = await db.enquiryModel.findAll()
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
    async updateenquiryModel(req, res){
        try {
                   const {   plateform, name, email,phoneno,Message}= req.body;
            const updateenquiryModel =await db.enquiryModel.update({
                   plateform:plateform,
                name:name,
                email:email,
                phoneno:phoneno,
                Message:Message
        },
        {where: {id: req.params.id} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            enquiryModel: updateenquiryModel,
            
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
    async deleteenquiryModel(req, res){
        try {
            const enquiryModelDetails =  await db.enquiryModel.destroy({
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