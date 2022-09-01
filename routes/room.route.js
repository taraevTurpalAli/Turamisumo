const { Router } = require('express');
const router = Router();
const { roomController } = require('../controllers/room.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

router.post('/room', roomController.postRoom);
router.get('/room-type/:type', roomController.getRoomType);
router.post('/room-type', roomController.postRoomType);


module.exports = router;