import { db } from '../../../../models';


export default {

    /* Add user api start here................................*/
// texDynamicSettings
// texStaticSettings
    async addTax(req, res, next) {
        console.log(req.body)
     
        try {
            const {  EnambleTex,GSTNumber,GSTState,AllowCustomerGST,ApplyDiscountOnOrder,SetTax,fixedRate}= req.body;
             await db.texStaticSettings.create({
                 EnambleTex:EnambleTex,
                 GSTNumber:GSTNumber,
                 GSTState:GSTState,
                 AllowCustomerGST:AllowCustomerGST,
                 ApplyDiscountOnOrder:ApplyDiscountOnOrder,
                 SetTax:SetTax,
           
            }).then(tax =>{
               
                   for (var i = 0; i < fixedRate.length; i++) {
                         db.texDynamicSettings.create({
                            fixChargeId:tax.id,
                            Sort:fixedRate[i].Sort,
                            FixedChargeLabel:fixedRate[i].FixedChargeLabel,
                            FixedChargeAmount:fixedRate[i].FixedChargeAmount
                        })

                   }
                   
             }).then((success) => {
                    res.status(200).json({ 'success': true });
                })
                .catch(function (err) {
                    console.log(error);
                    res.status(500).json({ 'errors': ['Error Add Products'] });
                });
           
        }catch (error) {
            return res.status(400).send({
                message: 'Unable to insert data',
                errors: error,
                status: 400
            });
        }
    },
    async getallTaxList(req,res,next){
        try{
            await db.texStaticSettings.findOne({
                where:{id :req.query.id},
                include:[{model:db.texDynamicSettings}]}).then(data => {
                    res.status(200).json({ 'success': true, data });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }

      
    },
      async update(req, res, next) {
        console.log(req.body)
     
        try {
            const {  EnambleTex,GSTNumber,taxid,GSTState,AllowCustomerGST,ApplyDiscountOnOrder,SetTax,fixedRate}= req.body;
             await db.texStaticSettings.findOne({
                where:{id :taxid},
                include:[{model:db.texDynamicSettings}]}).then(taxData => {
                    if(taxData){

                      db.texStaticSettings.update({
                        EnambleTex:EnambleTex,
                        GSTNumber:GSTNumber,
                        GSTState:GSTState,
                        AllowCustomerGST:AllowCustomerGST,
                        ApplyDiscountOnOrder:ApplyDiscountOnOrder,
                        SetTax:SetTax,
                
                    },{where:{id:taxid}})
                }
                if(fixedRate){
                      var alldata =json(taxData)
                      var idx = alldata.texDynamicSettings
                      var id =   idx.map(el => el.id) 
                     console.log(id)
                    db.texDynamicSettings.findAll ({ where: { fixedRate:taxid }})
                   for (var i = 0; i < fixedRate.length; i++) {
                        if(id[i]){
                             db.texDynamicSettings.update({
                            fixChargeId:taxid,
                            Sort:fixedRate[i].Sort,
                            FixedChargeLabel:fixedRate[i].FixedChargeLabel,
                            FixedChargeAmount:fixedRate[i].FixedChargeAmount
                          }, { where: { id:id[i]}})
                        }else{
                             db.texDynamicSettings.create({
                             fixChargeId:taxid,
                             Sort:fixedRate[i].Sort,
                             FixedChargeLabel:fixedRate[i].FixedChargeLabel,
                             FixedChargeAmount:fixedRate[i].FixedChargeAmount
                        })

                        }
                   }}

             }).then((success) => {
                    res.status(200).json({ 'success': true });
                })
                .catch(function (err) {
                    console.log(error);
                    res.status(500).json({ 'errors': ['Error Add Products'] });
                });

                
                 
            
        
           
        }catch (error) {
            return res.status(400).send({
                message: 'Unable to insert data',
                errors: error,
                status: 400
            });
        }
    },

//delete  dynamic3
 async deletedata(req,res,next){
        try{
            await db.texDynamicSettings.destroy({where:{id:req.query.id}}).then(data => {
                    res.status(200).json({ 'success': true, });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }

      
    },



}