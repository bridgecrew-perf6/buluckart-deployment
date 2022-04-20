import { db} from '../../../../../models';
 const CityManageSetting = db.citySettings
import { Country, State, City }  from 'country-state-city';


export default {

    /* Add user api start here................................*/

     async getallCityglobel(req,res,next){
         try{
      // const ItemDetails = await productModel.findAll();
        const Details = await City.getCitiesOfCountry("IN")
            res.status(200).send({
                status: 200,
                message: 'Data fetched Successfully',
                data: Details
            });
        
        }catch(err){
            res.send(err)
            console.log(err)
        }
     },

     async getallCountaryglobel(req,res,next){
         try{
      // const ItemDetails = await productModel.findAll();
        const Details = await Country.getAllCountries()
            res.status(200).send({
                status: 200,
                message: 'Data fetched Successfully',
                data: Details
            });
        
        }catch(err){
            res.send(err)
            console.log(err)
        }
     },

     
     async getallCityByFilter(req,res,next){
         try{
      // const ItemDetails = await productModel.findAll();
        const Details = await City.getCitiesOfCountry(req.query.isoCode)
            res.status(200).send({
                status: 200,
                message: 'Data fetched Successfully',
                data: Details
            });
        
        }catch(err){
            res.send(err)
            console.log(err)
        }
     },


    async addCityManageSetting(req, res, next) {
      try {
            const {City}= req.body;
            const CityManageSettingDetails = await CityManageSetting.create({City:City });
            
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: CityManageSettingDetails
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
async getCityManageSetting(req, res) {
    try {
        const CityManageSettingDetails = await CityManageSetting.findOne({ where: { id: req.query.id } });
        res.status(200).send({
            status: 200,
            message: 'Data fetched Successfully',
            data: CityManageSettingDetails
        });
    
      }catch(err){
            res.send(err)
            console.log(err)
        }
},
    async getCityManageSettingall(req, res){
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
        const ItemDetails = await CityManageSetting.findAll({ order: [['createdAt', 'DESC']]})
            res.status(200).send({
                status: 200,
                message: 'Data fetched Successfully',
                data: ItemDetails
            });
        
        }catch(err){
            res.send(err)
            console.log(err)
        }
    },
    async updateCityManageSetting(req, res){
        try {
            const {City,cityId}= req.body;
            const updateCityManageSetting =await CityManageSetting.update({
                    City:City
        },
        {where: {id: cityId} });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',
            CityManageSetting: updateCityManageSetting,
            
        });
          }catch(err){
            res.send(err)
            console.log(err)
        }
    },
    async deleteCityManageSetting(req, res){
        try {
          await CityManageSetting.destroy({
            where: {id: req.query.id}
            });
            await res.status(200).send({
                message:"delete successfull"
            })
         }catch(err){
            res.send(err)
            console.log(err)
        }
    }

}