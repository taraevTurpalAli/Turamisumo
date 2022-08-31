const { Router } = require('express');
const router = Router();
const { cartController } = require('../controllers/cart.controller.js');

router.get('/cart/:userId', cartController.getCart)
router.post('/cart/:userId', cartController.productAddCart);
router.delete('/cart/:userId', cartController.productDeleteCart);
router.delete('/cart/clear/:userId', cartController.productClearCart);
// router.post('/room-type', roomController.postRoomType);


module.exports = router;