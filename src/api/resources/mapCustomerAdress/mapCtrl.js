import { db } from '../../../models';
export default {

    /* Add user api start here................................*/



    async createMapAdress(req, res, next) {
        try {
            const { custId, adress } = req.body;
            console.log(req.body)
            await db.mapcustomeradress.create({
                custId: custId,
                addressType: adress.addressType ? adress.addressType : 'HOME',
                house: adress.house ? adress.house : '',
                street: adress.street ? adress.street : '',
                landmark: adress.landmark ? adress.landmark : '',
                area: adress.area ? adress.area : '',
                city: adress.city ? adress.city : '',
                discrict: adress.discrict,
                states: adress.states,
                pincode: adress.pincode,
                latitude: adress.latitude,
                longitude: adress.longitude
            }).then(data => {
                res.status(200).json({ 'success': true, msg: "Successfully inserted location" });
            })
                .catch(function (err) {
                    next(err)
                });

        } catch (err) {
            throw new RequestError('Error');
        }
    },
    async getlist(req, res, next) {
        try {
            await db.mapcustomeradress.findAll({
                where: { custId: req.params.custid }
            }).then(data => {
                res.status(200).json({ data, 'success': true, msg: "Successfully inserted location" });
            })
                .catch(function (err) {
                    next(err)
                });

        } catch (err) {
            throw new RequestError('Error')
        }

    },


    async updateadress(req, res, next) {
        try {
            const { custId, adress } = req.body;
            await db.mapcustomeradress.findOne({ where: { id: req.params.id } })
                .then(mapadress => {
                    if (mapadress) {
                        return db.mapcustomeradress.update({
                            custId: custId,
                            addressType: adress.addressType,
                            house: adress.house,
                            street: adress.street,
                            landmark: adress.landmark,
                            area: adress.area,
                            city: adress.city,
                            discrict: adress.discrict,
                            states: adress.states,
                            pincode: adress.pincode,
                            latitude: adress.latitude,
                            longitude: adress.longitude
                        }, { where: { id: req.params.id } })
                        res.status(200).json({ message: "updates succesfully" })
                    } else {
                        res.status(400).json({ message: "somthing went wrong" })
                    }
                })

        } catch (err) {
            throw new RequestError("Error")
        }
    },
    async deleteadress(req, res, next) {
        try {
            await db.mapcustomeradress.destroy({ where: { id: req.params.id } })
                .then(dat => {
                    return res.status(200).json({ message: "data deleted successfully" })
                }).catch(function (err) {
                    next(err)
                });


        } catch (err) {
            throw new RequestError('Error')
        }

    }
}


