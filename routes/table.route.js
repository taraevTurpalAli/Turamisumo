const { Router } = require('express');
const { tableController } = require('../controllers/table.controller');
const router = Router();
const { userController } = require("../controllers/user.controller")

router.post('/table', tableController.postTable);


module.exports = router;
