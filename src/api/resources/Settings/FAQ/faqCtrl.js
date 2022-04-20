import { db } from '../../../../models';


export default {

    /* Add user api start here................................*/

    async addfaqSettings(req, res, next) {
        console.log(req.body)
       
        try {
            const {  Category ,Question , AnswerText,}= req.body;
            const faqSettingsDetails = await db.faqSettings.create({
                 Category:Category,
                 Question:Question,
                 AnswerText:AnswerText,
            });
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: faqSettingsDetails
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
async getfaqSettings(req, res) {
    try {
        const faqSettingsDetails = await db.faqSettings.findOne({ where: { id: req.query.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: faqSettingsDetails
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
    async getfaqSettingsall(req, res){
        try {
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
         
        const ItemDetails = await db.faqSettings.findAll({ order: [['createdAt', 'DESC']]})
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
    async updatefaqSettings(req, res){
        try {
            const {  Category ,Question ,faqid, AnswerText,}= req.body;
            const updatefaqSettings =await db.faqSettings.update({
                 Category:Category,
                 Question:Question,
                 AnswerText:AnswerText,
        },
        {where: {id: faqid} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            faqSettings: updatefaqSettings,
            
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
    async deletefaqSettings(req, res){
        try {
          await db.faqSettings.destroy({
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