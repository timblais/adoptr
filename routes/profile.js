const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const profileController = require('../controllers/profile') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/:id', ensureAuth, profileController.getProfile)

module.exports = router