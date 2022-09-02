const Cart = require('../Models/Cart.model.js')
const User = require('../Models/User.model')
const Product = require('../Models/Product.model.js')
const { findById } = require('../Models/User.model')

module.exports.cartController = {
    buyCart: async (req, res) => {
        try {
            const { userId } = req.params
            const setUser = await User.findById(userId)
            const setCart = await Cart.findOne({
                userId: setUser._id
            }).populate('products.productId')

            setCart.products.forEach((el) => {
                setUser.cash.forEach((el) => {
                    
                })
                // await User.findByIdAndUpdate(setCartId, {
                //     $push: {
                //         cash: {
                //             name: String,
                //             amount: Number,
                //             price: Number
                //         }
                //     }
                // })
            });

            res.json(setCart.products)
        } catch (e) {
            res.json(e)
        }
    },
    getCart: async (req, res) => {
        try {
            const { userId } = req.params
            const setUser = await User.findById(userId)
            const setCart = await Cart.find({
                userId: setUser._id
            })
            const setCartId = String(setCart[0]._id)
            res.json(await Cart.findById(setCartId).populate('products.productId'))
        } catch (e) {
            res.json(e)
        }
    },
    productAddCart: async (req, res) => {
        try {
            const { userId } = req.params
            const setUser = await User.findById(userId)
            const setCart = await Cart.findOne({
                userId: setUser._id
            })
            const setCartId = String(setCart._id)

            const { product } = req.body

            const setProduct = await Product.findById(product)

            const testSetCart = setCart.products
            if (testSetCart) {
                for (let i = 0; i < testSetCart.length; i++) {
                    if (String(testSetCart[i].productId) === String(product)) {
                        return res.json('Продукт уже в корзине')
                    }
                }
            }

            await Cart.findByIdAndUpdate(setCartId, {
                $push: {
                    products: {
                        productId: product
                    }
                },
                mainPrice: setCart.mainPrice + setProduct.price
            })

            const setCart0 = await Cart.findById(setCartId)


            res.json(setCart0)

        } catch (e) {
            res.json(e)
        }
    },
    productDeleteCart: async (req, res) => {
        try {
            const { userId } = req.params
            const setUser = await User.findById(userId)
            const setCart = await Cart.findOne({
                userId: setUser._id
            })
            const setCartId = String(setCart._id)

            const { product } = req.body

            const setProduct = await Product.findById(product)
            const setProducts = setCart.products.filter((el) => {
                return (String(el.productId) !== String(setProduct._id))
            })

            const setAmount = setCart.products.filter((el) => {
                return (String(el.productId) === String(setProduct._id))
            })
            console.log(setAmount)
            await Cart.findByIdAndUpdate(setCartId, {
                products: setProducts,
                mainPrice: setCart.mainPrice - (setProduct.price * setAmount[0].amount)
            })
            const setCart0 = await Cart.findById(setCart._id)

            res.json(await Cart.findById(setCart0).populate('products.productId'))
        } catch (e) {
            res.json(e)
        }
    },
    productClearCart: async (req, res) => {
        try {
            const { userId } = req.params
            const setUser = await User.findById(userId)
            const setCart = await Cart.findOne({
                userId: setUser._id
            })
            const setCartId = String(setCart._id)

            const nullArr = setCart.products.filter((el) => false)
            await Cart.findByIdAndUpdate(setCartId, {
                products: nullArr,
                mainPrice: 0
            })
            const setCart0 = await Cart.find({
                userId: setUser._id,
            })

            res.json(setCart0)
        } catch (e) {
            res.json(e)
        }
    },
    productIncCart: async (req, res) => {
        try {
            const { userId } = req.params
            const setUser = await User.findById(userId)
            const setCart = await Cart.findOne({
                userId: setUser._id
            })
            const setCartId = String(setCart._id)

            const { product } = req.body
            
            const setProduct = await Product.findById(product)
            
            const setProducts = setCart.products.map((el) => {
                if (String(el.productId) === String(setProduct._id)) {
                    el.amount += 1
                }
                return el
            })

            await Cart.findByIdAndUpdate(setCartId, {
                products: setProducts,
                mainPrice: setCart.mainPrice + setProduct.price
            })
            const setCart0 = await Cart.findById(setCartId)
            
            res.json(await Cart.findById(setCart0).populate('products.productId'))
            
        } catch (e) {
            res.json(e)
        }
    },
    productDecCart: async (req, res) => {
        try {
            const { userId } = req.params
            const setUser = await User.findById(userId)
            const setCart = await Cart.findOne({
                userId: setUser._id
            })
            const setCartId = String(setCart._id)

            const { product } = req.body

            const setProduct = await Product.findById(product)

            const setProducts = setCart.products.map((el) => {
                if (String(el.productId) === String(setProduct._id)) {
                    el.amount -= 1
                    return el
                }
                return el
            })



            await Cart.findByIdAndUpdate(setCartId, {
                products: setProducts,
                mainPrice: setCart.mainPrice - setProduct.price
            })

            const setCart1 = await Cart.findById(setCartId)
            res.json(await Cart.findById(setCart1).populate('products.productId'))
        } catch (e) {
            res.json(e)
        }
    },

}
