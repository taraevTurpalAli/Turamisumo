const { Router } = require('express');
const { tableController } = require('../controllers/table.controller');
const router = Router();
const { userController } = require("../controllers/user.controller")

router.post('/table', tableController.postTable);
router.get('/table', tableController.getTable);

module.exports = router;
