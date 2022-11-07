const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const postsController = require('../controllers/posts') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/:id', ensureAuth, postsController.getPost)

module.exports = router