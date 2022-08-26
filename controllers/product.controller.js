const { findByIdAndUpdate } = require("../Models/Category.model")
const Category = require("../Models/Category.model")
const Product = require("../Models/Product.model")

module.exports.productController = {
    postProduct: async (req, res) => {
        try {
            const { name, price, category } = req.body
            
            const setProduct = await Product.create({
                name,
                price,
            })
            const setCategory = await Category.find({ name: category })
            
            if (setCategory[0]) {
                const setProductId = setProduct._id
                const setCategoryId = setCategory[0]._id
                await Category.findByIdAndUpdate(setCategoryId, {
                    $push: {
                        productId: setProductId
                    }
                })
            } else {
                const setCategory0 = await Category.create({
                    name: category,
                    productId: []
                })
                const setProductId = setProduct._id
                const setCategoryId = setCategory0._id
                await Category.findByIdAndUpdate(setCategoryId, {
                    $push: {
                        productId: setProductId
                    }
                })
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