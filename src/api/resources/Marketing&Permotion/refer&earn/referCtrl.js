import { db } from '../../../../models';


export default {

    /* Add user api start here................................*/

    async addreferEarnModel(req, res, next) {
        console.log(req.body)
        try {
            const {   discount,DaysValidity, Message, Notification, status}= req.body;
            const referDetails = await db.referEarnModel.create({
               discount:discount,
               DaysValidity:DaysValidity,
               Message:Message,
               Notification:Notification,
               status:status
            });
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: referDetails
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
async getrefer(req, res) {
    try {
        const referDetails = await db.referEarnModel.findOne({ where: { id: req.params.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: referDetails
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
    async getreferall(req, res){
        try {
            // const ItemDetails = await productModel.findAll();
        const ItemDetails = await db.referEarnModel.findAll()
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
    async updaterefer(req, res){
        try {
            const {   discount,DaysValidity, Message, Notification, status}= req.body;
            const updaterefer =await db.referEarnModel.update({
               discount:discount,
               DaysValidity:DaysValidity,
               Message:Message,
               Notification:Notification,
               status:status
        },
        {where: {id: req.params.id} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            refer: updaterefer,
            
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
    async deleterefer(req, res){
        try {
            const referDetails =  await db.referEarnModel.destroy({
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