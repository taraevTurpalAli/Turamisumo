const Cart = require('../Models/Cart.model.js')
const User = require('../Models/User.model')
const Product = require('../Models/Product.model.js')
const { findById } = require('../Models/User.model')

module.exports.cartController = {
    getCart: async (req, res) => {
        try {
            const { userId } = req.params
            const setUser = await User.findById(userId)
            const setCart = await Cart.find({
                userId: setUser._id
            })
            const setCartId = String(setCart[0]._id)
            res.json(await Cart.findById(setCartId).populate('products'))
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
                    products: product
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
                return(String(el) !== String(setProduct._id))
            })
            
            console.log(String(setCart.products))
            console.log(String(setProducts))
            
            await Cart.findByIdAndUpdate(setCartId, {
                products: setProducts
            })
            
            const setCart0 = await Cart.findById(setCart._id)
            
            res.json(setCart0)
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
                    products: nullArr
                })
                const setCart0 = await Cart.find({
                    userId: setUser._id
                })
                
                res.json('Корзина успешно очищена')
            } catch (e) {
                res.json(e)
            }
        },
    //     productIncCart: async (req, res) => {
    //         try {
    //             const { userId } = req.params
    //             const setUser = await User.findById(userId)
    //             const setCart = await Cart.find({
    //                 userId: setUser._id
    //             })
    //             const setCartId = String(setCart[0]._id)

    //             const { product } = req.body

    //             const setCart0 = await Cart.findById(setCartId)
    //             const setProduct = await Product.findById(product)

    //             if (setProduct.left < 1) {
    //                 return res.json("Нет на складе")
    //             }

    //             const setProducts = setCart0.products.map((el) => {
    //                 if (String(el.productId) === String(setProduct._id)) {
    //                     el.amount += 1
    //                 }
    //                 return el
    //             })



    //             await Cart.findByIdAndUpdate(setCartId, {
    //                 products: setProducts
    //             })

    //             await Product.findByIdAndUpdate(product, {
    //                 left: setProduct.left - 1
    //             })

    //             // res.json(setProducts)
    //             res.json('+')

    //         } catch (e) {
    //             res.json(e)
    //         }
    //     },
    //     productDecCart: async (req, res) => {
    //         try {
    //             const { userId } = req.params
    //             const setUser = await User.findById(userId)
    //             const setCart = await Cart.find({
    //                 userId: setUser._id
    //             })
    //             const setCartId = String(setCart[0]._id)

    //             const { product } = req.body

    //             const setCart0 = await Cart.findById(setCartId)
    //             const setProduct = await Product.findById(product)

    //             if (setCart0.left < 1) {
    //                 return res.json("Нет на складе")
    //             }

    //             const setProducts = setCart0.products.map((el) => {
    //                 if (String(el.productId) === String(setProduct._id)) {
    //                     el.amount -= 1
    //                     return el
    //                 }
    //                 return el
    //             })



    //             await Cart.findByIdAndUpdate(setCartId, {
    //                 products: setProducts
    //             })

    //             await Product.findByIdAndUpdate(product, {
    //                 left: setProduct.left + 1
    //             })

    //             res.json('-')

    //         } catch (e) {
    //             res.json(e)
    //         }
    //     },

}
