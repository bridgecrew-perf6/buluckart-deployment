import { db } from '../../../../models';


export default {

    /* Add user api start here................................*/

    async addbannerSettings(req, res, next) {
        console.log(req.file)

        try {
            const { categoryId, BannerType, imageCaption, photoUrl, status, links } = req.body;
            const bannerSettingsDetails = await db.bannerSettings.create({
                categoryId: categoryId,
                BannerType: BannerType,
                imageCaption: imageCaption,
                photoUrl: req.file ? req.file.location : '',
                links: links,
                status: status
            });
            res.status(200).send({
                status: 200,
                message: 'Data Save Successfully',
                data: bannerSettingsDetails
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
    async getbannerSettings(req, res) {
        try {
            const bannerSettingsDetails = await db.bannerSettings.findOne({ where: { id: req.params.id } });
            res.status(200).send({
                status: 200,
                message: 'Data fetched Successfully',
                data: bannerSettingsDetails
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
    async getbannerSettingsall(req, res) {
        let limit = 10;
        let sort = ['createdAt', 'DESC'];
        let offset = 0;
        let page = 1;
        if (req.query.limit != undefined) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.page != undefined) {
            page = req.query.page;
            if (page < 1)
                page = 1;
        }
        if (req.query.sort) {
            if (req.query.sort == 'name') {
                sort = ['name'];
            }
        }
        try {
            // const ItemDetails = await productModel.findAll();
            const ItemDetails = await db.bannerSettings.findAll({ order: [['createdAt', 'DESC']] })
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
    async updatebannerSettings(req, res) {
        try {
            const { BannerType, imageCaption, bannerid, photoUrl, status, links } = req.body;
            console.log(req.body)
            const updatebannerSettings = await db.bannerSettings.update({
                BannerType: BannerType,
                imageCaption: imageCaption,
                photoUrl: req.file ? req.file.location : '',
                links: links,
                status: status
            },
                { where: { id: bannerid } });
            return res.status(201).send({
                status: 200,
                message: 'Data update Successfully',
                bannerSettings: updatebannerSettings,

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
    async deletebannerSettings(req, res) {
        try {
            await db.bannerSettings.destroy({
                where: { id: req.query.id }
            });
            await res.status(200).send({
                message: "delete successfull"
            })
        }
        catch (error) {
            return res.status(400).send({
                message: 'Unable to update data',
                errors: error,
                status: 400
            });
        }
    },

    // get single  by id
    async getbannerBannerTyp(req, res) {
        try {
            const bannerSettingsDetails = await db.bannerSettings.findOne({ where: { BannerType: req.query.BannerType } });
            res.status(200).send({
                status: 200,
                message: 'Data fetched Successfully',
                data: bannerSettingsDetails
            });
        }
        catch (error) {
            return res.status(400).send({
                message: 'Unable to fetch data',
                errors: error,
                status: 400
            });
        }
    }

}