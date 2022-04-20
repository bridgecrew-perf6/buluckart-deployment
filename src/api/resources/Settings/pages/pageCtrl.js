import { db } from '../../../../models';


export default {

    /* Add user api start here................................*/

    async addpageSettings(req, res, next) {
        console.log(req.body)
       
        try {
            const {   Page, Message}= req.body;
            const pageSettingsDetails = await db.pageSettings.create({
                Page:Page, 
                Message:Message
            });
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: pageSettingsDetails
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
async getpageSettings(req, res) {
    try {
        const pageSettingsDetails = await db.pageSettings.findOne({ where: { id: req.params.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: pageSettingsDetails
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
    async getpageSettingsall(req, res){
        try {
            // const ItemDetails = await productModel.findAll();
        const ItemDetails = await db.pageSettings.findAll()
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
    async updatepageSettings(req, res){
        try {
            const {   Page, Message}= req.body;
            const updatepageSettings =await db.pageSettings.update({
                 Page:Page, 
                 Message:Message
        },
        {where: {id: req.params.id} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            pageSettings: updatepageSettings,
            
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
    async deletepageSettings(req, res){
        try {
            const pageSettingsDetails =  await db.pageSettings.destroy({
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