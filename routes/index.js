const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const indexController = require('../controllers/index')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', indexController.getIndex)


module.exports = router