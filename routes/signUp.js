const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', authController.getSignup)
router.post('/', authController.postSignup)

module.exports = router