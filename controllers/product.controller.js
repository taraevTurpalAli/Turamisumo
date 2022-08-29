const { findByIdAndUpdate } = require("../Models/Category.model")
const Category = require("../Models/Category.model")
const Product = require("../Models/Product.model")

module.exports.productController = {
    postProduct: async (req, res) => {
        try {
            const { name, price, category, law } = req.body
            
            const setCategory = await Category.findOne({ name: category })
            
            if (setCategory === null) {
                const setCategory0 = await Category.create({
                    name: category
                })
                const setProduct = await Product.create({
                    name,
                    price,
                    law,
                    categoryId: setCategory0._id
                })
                res.json(setProduct)
            } else {
                const setProduct = await Product.create({
                    name,
                    price,
                    law,
                    categoryId: setCategory._id
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
            await Product.findByIdAndRemove(setProduct._id)
            const setProducts = await Product.find()
            res.json(setProducts)
        }
        catch (e) {
            res.json(e)
        }
    },

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