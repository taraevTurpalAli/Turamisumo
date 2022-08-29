const { Router } = require('express');
const router = Router();
const { productController } = require('../controllers/product.controller.js');

router.post('/product', productController.postProduct);
router.post('/category', productController.postCategory);
router.delete('/product/:name', productController.deleteProduct);

// router.get('/room-type/:type', productController.getRoomType);


module.exports = router;