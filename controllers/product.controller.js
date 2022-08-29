const { findByIdAndUpdate } = require("../Models/Category.model")
const Category = require("../Models/Category.model")
const Product = require("../Models/Product.model")

module.exports.productController = {
    postProduct: async (req, res) => {
        try {
            const { name, price, category, law, image, title } = req.body
            
            const setCategory = await Category.findOne({ name: category })
            const setProduct0 = await Product.findOne({name})
            if (setProduct0 !== null) {
                return(res.json('Продукт уже существует'))
            }
            if (setCategory !== null) {
                const setProduct = await Product.create({
                    name,
                    price,
                    law,
                    image,
                    title,
                    categoryId: setCategory._id
                })
                await Category.findByIdAndUpdate(setCategory._id, {
                    $push: {
                        productId: setProduct._id
                    }
                })
                res.json(setProduct)
            } else {
                const setCategory0 = await Category.create({
                    name: category,
                    productId: []
                })
                const setProduct = await Product.create({
                    name,
                    price,
                    law,
                    image,
                    title,
                    categoryId: setCategory0._id
                })
                await Category.findByIdAndUpdate(setCategory0._id, {
                    $push: {
                        productId: setProduct._id
                    }
                })
                res.json(setProduct)
            }
        }
        catch (e) {
            res.json(e)
        }
    },
    getProduct: async (req, res) => {
        try {
            const setProducts = await Product.find()
            res.json(setProducts)
        } catch (e) {
            res.json(e)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { name } = req.params
            
            const setProduct = await Product.findOne({
                name
            })
            if (setProduct === null) {
                return (res.json('Продукта не существует'))
            }
            const setCategory = await Category.findById(setProduct.categoryId)
            await Product.findByIdAndRemove(setProduct._id)
            const setArr = setCategory.productId.filter((el) => {
                return (String(el) !== String(setProduct._id))
            })
            console.log(setArr)
            if (setArr[0]) {
                await Category.findByIdAndUpdate(setCategory._id, {
                    productId: setArr
                })
            } else {
                await Category.findByIdAndRemove(setCategory._id)
            }
            res.json(setProduct)
        }
        catch (e) {
            res.json(e)
        }
    },

    // deleteProduct: async (req, res) => {
    //     try {
    //         const { name } = req.params
            
    //         const setProduct = await Product.find({
    //             name
    //         })

    //         const setCategory
    //         const setCategory = await Category.find({ name:  })
            
    //         const setProductId = setProduct._id
    //         const setCategoryId = setCategory[0]._id
    //         await Category.findByIdAndUpdate(setCategoryId, {
    //             $push: {
    //                 productId: setProductId
    //             }
    //         })



            // if (setCategory[0]) {
            //     const setProductId = setProduct._id
            //     const setCategoryId = setCategory[0]._id
            //     await Category.findByIdAndUpdate(setCategoryId, {
            //         $push: {
            //             productId: setProductId
            //         }
            //     })
            // } else {
            //     const setCategory0 = await Category.create({
            //         name: category,
            //         productId: []
            //     })
            //     const setProductId = setProduct._id
            //     const setCategoryId = setCategory0._id
            //     await Category.findByIdAndUpdate(setCategoryId, {
            //         $push: {
            //             productId: setProductId
            //         }
            //     })
            // }
            // res.json(setProduct)
        // }
    //     catch (e) {
    //         res.json(e)
    //     }
    // },



    postCategory: async (req, res) => {
        try {
            const { name } = req.body
            const setCategory = await Category.create({
                name,
                productId: []
            })
            res.json(setCategory)
        }
        catch (e) {
            res.json(e)
        }
    },
    // postRoomType: async (req, res) => {
    //     try {
    //         const {name, images} = req.body
    //         const setRoomType = await RoomType.create({
    //             name,
    //             images,
    //         })
    //         res.json(setRoomType)
    //     }
    //     catch (e) {
    //         res.json(e)
    //     }
    // },
    // getRoomType: async (req, res) => {
    //     try {
    //         const {type} = req.params
    //         if (type === 'all') {
    //             res.json(await RoomType.find())
    //         } else {
    //             res.json(await RoomType.find({name: type}))
    //         }
    //     }
    //     catch (e) {
    //         res.json(e)
    //     }
    // }
}