const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.put('/', ensureAuth, postsController.likePost)

module.exports = router