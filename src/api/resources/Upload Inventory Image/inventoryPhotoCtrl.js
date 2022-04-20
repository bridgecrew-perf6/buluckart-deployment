import { db } from '../../../models';



export default {
    async addInventoryPhoto(req, res, next) {
        try {
            console.log(req.file)
            const {photo}= req.body
         
            await db.inventoryImageModel.create({
                photoUrl:req.file ? req.file.location : '',
                name:req.file ? req.file.originalname :''
            })
            res.send("sucess")
              
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
     // get single  by id
async getinventory(req, res) {
    try {
        const inventoryDetails = await  db.inventoryImageModel.findOne({ where: { id: req.params.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: inventoryDetails
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
    async getinventoryall(req, res){
        try {
            // const ItemDetails = await productModel.findAll();
        const ItemDetails = await  db.inventoryImageModel.findAll()
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
    async updateinventory(req, res){
        try {
            const updateinventory =await  db.inventoryImageModel.update({
                name:req.body.name,
                description:req.body.description

        },
        {where: {id: req.params.id} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            inventory: updateinventory,
            
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
    async deleteinventory(req, res){
        try {
              const imgid = req.query.id
              console.log(imgid)
              console.log(req.body)
             await  db.inventoryImageModel.destroy({
            where: {id:imgid}
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