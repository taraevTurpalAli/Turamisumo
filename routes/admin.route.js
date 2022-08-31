const { Router } = require('express')
const router = Router()
const { adminController } = require('../controllers/admin.controller')

router.post('/create/admin', adminController.createAdmin)
router.post('/login/admin', adminController.loginUser)

module.exports = router
