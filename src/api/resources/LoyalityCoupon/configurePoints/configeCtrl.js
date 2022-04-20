import { db } from '../../../../models';


export default {

    /* Add user api start here................................*/

    async addLoyaltyPointModel(req, res, next) {
        console.log(req.body)
        try {
            const { Points,Amounts,validFrome,status}= req.body;
            const configueDetails = await db.LoyaltyPointModel.create({
                Points:Points,
                Amounts:Amounts,
                validFrome:validFrome,
                status:status

            });
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: configueDetails
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
async getconfigue(req, res) {
    try {
        const configueDetails = await db.LoyaltyPointModel.findOne({ where: { id: req.params.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: configueDetails
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
    async getconfigueall(req, res){
        try {
            // const ItemDetails = await productModel.findAll();
        const ItemDetails = await db.LoyaltyPointModel.findAll()
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
    async updateconfigue(req, res){
        try {
                 const {Points,Amounts,validFrome,status}= req.body;
            const updateconfigue =await db.LoyaltyPointModel.update({
                  Points:Points,
                Amounts:Amounts,
                validFrome:validFrome,
                status:status
        },
        {where: {id: req.params.id} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            configue: updateconfigue,
            
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
    async deleteconfigue(req, res){
        try {
            const configueDetails =  await db.LoyaltyPointModel.destroy({
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