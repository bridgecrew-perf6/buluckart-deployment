import { db } from '../../../models';
const { Op } = require("sequelize");

export default {

    /* ================================================Category List controller===============================================*/
    async addCategory(req, res, next) {
        console.log(req.file)
        console.log(req.body)
        try {
            console.log(req.file)
            const { name, photo } = req.body;
            await db.category.findOne({
                where: { name: name }
            }).then(doc => {
                if (!doc) {
                    return db.category.create({
                        name: name,
                        photo: req.file ? req.file.location : '',
                    })
                }
                throw new RequestError('Already exist product', 409);
            })
                .then(doc => {
                    res.status(200).json({ 'success': true, msg: "Successfully inserted product" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    //update category...........
    async updatecategoryOnly(req, res, next) {
        try {
            const { categoryId, name, photo } = req.body;
            await db.category.findOne({ where: { id: categoryId } })
                .then(data => {
                    if (data) {
                        return db.category.update({
                            name: name,
                            photo: req.file ? req.file.location : '',
                        }, { where: { id: categoryId } })
                    }
                    throw new RequestError('Category Not Found', 409);
                }).then(data => {
                    res.status(200).json({ 'success': true, msg: "Successfully Updated" });
                })
                .catch(function (err) {
                    next(err)
                });
        } catch (err) {
            res.send(err)
            console.log(err)
        }
    },
    //  get category list
    async getMainList(req, res, next) {
        try {
            db.category.findAll({
                attributes: ["id", "name", "photo"],
                include: [{ model: db.SubCategory }]
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    //get all category list.................
    async getCategoryList(req, res, next) {
        try {
            db.category.findAll({
                attributes: ["id", "name", "photo"],
                include: [{ model: db.SubCategory }],

            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    async GetAllrecomendedCategory(req, res, next) {
        try {
            db.category.findAll({
                include: [{ model: db.SubCategory, include: [{ model: db.product, include: [{ model: db.varientModel }, { model: db.SubCategory }, { model: db.productphoto }, { model: db.tagModel }] }] }],


            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    // get category by id
    async getCategoryById(req, res, next) {
        try {
            const adressDetails = await db.category.findOne({ where: { id: req.params.id } });
            res.status(200).send({
                status: 200,
                message: 'Data fetched Successfully',
                data: adressDetails
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
    //delete category---------------
    async deleteCategory(req, res, next) {

        try {
            await db.category.destroy({
                where: { id: req.params.id }
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



    /* ================================================sub Category List controller===============================================*/
    // add sub category.............
    async addSubCategory(req, res, next) {
        console.log(req.file)
        console.log(req.body)
        try {
            const { categoryId, sub_name, subcategoryPhoto } = req.body;
            await db.SubCategory.findOne({ where: { sub_name: sub_name } })
                .then(data => {
                    if (data) {
                        throw new RequestError('Category already exist', 409);
                    }
                    return db.SubCategory.create({
                        categoryId: categoryId,
                        sub_name: sub_name,
                        photo: req.file ? req.file.location : '',
                    })
                })
                .then(category => {
                    res.status(200).json({ 'success': true, msg: "Successfully inserted category" });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    //update Subcategory...........
    async updateSubCategoryOnly(req, res, next) {
        try {
            const { subcategoryId, sub_name, name } = req.body;
            db.SubCategory.findOne({ where: { id: subcategoryId } })
                .then(data => {
                    if (data) {
                        return db.SubCategory.update({
                            sub_name: sub_name,
                            photo: req.file ? req.file.location : '',
                        }, { where: { id: subcategoryId } })
                    }
                    throw new RequestError('Category Not Found', 409);

                }).then(data => {
                    res.status(200).json({ 'success': true, msg: "Successfully sub category Updated" });
                })
                .catch(function (err) {
                    next(err)
                });
        } catch (err) {
            res.send(err)
            console.log(err)
        }
    },


    //sub category main list witth category
    async getSubCategoryList(req, res, next) {
        try {
            db.SubCategory.findAll({
                where: { categoryId: req.query.categoryId },
                include: [{ model: db.category, attributes: ["id", "name", "photo"] }]
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },
    //subcategory list only
    async getSubCategoryListOnly(req, res, next) {
        try {
            db.SubCategory.findAll()
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    // get subcategory by id
    async getSubCategoryById(req, res, next) {
        try {
            const adressDetails = await db.SubCategory.findAll({ where: { categoryId: req.params.id } });
            res.status(200).send({
                status: 200,
                message: 'Data fetched Successfully',
                data: adressDetails
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
    //delete subcategory---------------
    async deleteSubCategory(req, res, next) {

        try {
            await db.SubCategory.destroy({
                where: { id: req.params.id }
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



    /* ================================================ other important list controller===============================================*/
    // Sub category list
    async getSubCategory(req, res, next) {
        try {
            db.SubCategory.findAll({
                include: [{ model: db.category, attributes: ["id", "name"] }]
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },


    async filterByCategoryList(req, res, next) {
        try {
            db.product.findAll({
                where: { childCategoryId: req.params.id },
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async getFilterbyCategory(req, res, next) {
        try {
            let { id, name } = req.body;
            db.SubCategory.findOne({
                attributes: ["id", "sub_name"],
                where: { id: id, sub_name: name },
                i
            })
                .then(product => {
                    res.status(200).json({ 'success': true, data: product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    async getProductBySubcategory(req, res, next) {
        try {
            let { id, name } = req.body;
            let search = '%%';
            if (name) {
                search = '%' + name + '%';
            }
            db.SubCategory.findAll({
                attributes: ["id", "sub_name"],
                include: [{
                    model: db.product, order: [['createdAt', 'DESC']], required: true, where: {
                        [Op.or]: [{ name: { [Op.like]: search }, subCategoryId: id }],
                    }
                }]
            })
                .then(product => {
                    res.status(200).json({ 'success': true, data: product });
                })
                .catch(function (err) {
                    next(err)
                });
        }
        catch (err) {
            throw new RequestError('Error');
        }
    },

    //mobile
    async getAllMobileCategory(req, res, next) {
        try {
            db.category.findAll({
                attributes: ["id", "name"],
                include: [{ model: db.SubCategory, }]
            })
                .then(list => {
                    res.status(200).json({ 'success': true, data: list });
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


