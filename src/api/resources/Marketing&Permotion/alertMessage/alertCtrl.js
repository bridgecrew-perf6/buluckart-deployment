import { db } from '../../../../models';


export default {

    /* Add user api start here................................*/

    async addalertMsgModel(req, res, next) {
        console.log(req.body)
        try {
            const { title,alerttext,pushstatus,clients,reason,message}= req.body;
            const alertDetails = await db.alertMsgModel.create({
                title:title,
                alerttext:alerttext,
                pushstatus:pushstatus,
                clients:clients,
                reason:reason,
                message:message

            });
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: alertDetails
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
async getalert(req, res) {
      
    try {
       const alertDetails = await db.alertMsgModel.findOne({  where: { id: req.params.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: alertDetails
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
    async getalertall(req, res){
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
            if(req.query.sort == 'title'){
                sort = ['title'];
            }
        }
        try {
            // const ItemDetails = await productModel.findAll();
        const ItemDetails = await db.alertMsgModel.findAll({ order: [['createdAt', 'DESC']]})
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
    async updatealert(req, res){
        try {
                 const { title,alerttext,pushstatus,clients,reason,message}= req.body;
            const updatealert =await db.alertMsgModel.update({
                 title:title,
                alerttext:alerttext,
                pushstatus:pushstatus,
                clients:clients,
                reason:reason,
                message:message
        },
        {where: {id: req.params.id} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            alert: updatealert,
            
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
    async deletealert(req, res){
        try {
            const alertDetails =  await db.alertMsgModel.destroy({
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