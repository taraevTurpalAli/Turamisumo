const { Router } = require('express');
const router = Router();
const { roomController } = require('../controllers/room.controller.js');

router.post('/room', roomController.postRoom);
// router.post('/all-room', roomController.postAllRoom);
router.get('/room-type/:type', roomController.getRoomType);
router.post('/room-type', roomController.postRoomType);


module.exports = router;